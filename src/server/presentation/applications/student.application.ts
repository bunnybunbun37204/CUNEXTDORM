import { z } from "zod";

import { publicProcedure, router } from "../../infrastructure/protocol/trpc/trpc";
import { errorMiddleware } from "../middlewares/error.middleware";

const updateProfileInput = z.object({
	id: z.string(),
	name: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
});

export const studentRouter = router({
	update: publicProcedure
		.use(errorMiddleware)
		.input(updateProfileInput)
		.mutation(async ({ ctx, input }) => {
			return ctx.useCases.updateProfile.execute(input);
		}),
});
