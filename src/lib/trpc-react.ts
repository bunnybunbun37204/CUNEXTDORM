import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server/trpc";

export const trpc = createTRPCReact<AppRouter>(); // Create React tRPC instance

// ✅ Export the tRPC client
export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:4321/api/trpc", // Ensure this is correct
		}),
	],
});
