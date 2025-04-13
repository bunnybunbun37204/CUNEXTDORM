import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import { SubmitApplicationUseCase } from "../../application/usecases/submit-dorm.usecase";
import { PrismaActivityRepository } from "../../infrastructure/database/repositories/activity.repository";
import { PrismaApplicationRepository } from "../../infrastructure/database/repositories/application.repository";
import { publicProcedure, router } from "../base";
import { errorMiddleware } from "../middlewares/error.middleware";

const prisma = new PrismaClient();
const activityRepo = new PrismaActivityRepository(prisma);
const applicationRepo = new PrismaApplicationRepository(prisma);

const submitApplicationUseCase = new SubmitApplicationUseCase(applicationRepo, activityRepo);

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
		.mutation(async ({ input }) => {
			return submitApplicationUseCase.execute(input);
		}),
});
