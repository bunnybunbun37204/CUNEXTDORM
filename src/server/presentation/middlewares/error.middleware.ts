import { TRPCError } from "@trpc/server";
import { middleware } from "../../infrastructure/protocol/trpc/trpc";

export const errorMiddleware = middleware(async (opts) => {
	const result = await opts.next();
	if (!result.ok) {
		const err = result.error;

		console.error("🔥 ErrorMiddleware caught:", {
			name: err.cause?.name,
			message: err.message,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			code: (err as any)?.code ?? (err.cause as any)?.code,
		});

		// Safely extract code and message
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const code = (err.cause as any)?.code ?? "INTERNAL_SERVER_ERROR";
		const message = err.message ?? "Unknown error";

		// Do NOT pass `cause` into TRPCError. It's not serializable!
		throw new TRPCError({
			code,
			message,
		});
	}
	return result;
});
