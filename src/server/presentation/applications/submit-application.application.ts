import { z } from "zod";

import { publicProcedure, router } from "../../infrastructure/protocol/trpc/trpc";
import { errorMiddleware } from "../middlewares/error.middleware";

const submitApplicationInput = z.object({
	applicantId: z.string(),
	academicYear: z.string(),
	answers: z.array(
		z.object({
			questionId: z.string(),
			answerText: z.string(),
		}),
	),
});

export const submitApplicationRouter = router({
	submit: publicProcedure
		.use(errorMiddleware)
		.input(submitApplicationInput)
		.mutation(async ({ ctx, input }) => {
			return ctx.useCases.submitApplication.execute(input);
		}),
});
