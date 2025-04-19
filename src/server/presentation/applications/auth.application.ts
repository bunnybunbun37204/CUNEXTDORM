import { z } from "zod";

import { publicProcedure, router } from "../../infrastructure/protocol/trpc/trpc";
import { errorMiddleware } from "../middlewares/error.middleware";

const ticketInput = z.object({
	ticket: z.string(),
});

export const authRouter = router({
	login: publicProcedure
		.use(errorMiddleware)
		.input(ticketInput)
		.query(async ({ ctx, input }) => {
			return ctx.useCases.auth.login(input.ticket);
		}),
	getUrl: publicProcedure.use(errorMiddleware).query(async ({ ctx }) => {
		console.log("getUrl");
		return ctx.useCases.auth.getLoginUrl();
	}),
});
