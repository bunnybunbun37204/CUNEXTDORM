import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import { SubmitApplicationUseCase } from "../application/usecases/submit-dorm.usecase";
import { PrismaActivityRepository } from "../infrastructure/database/repositories/activity.repository";
import { PrismaApplicationRepository } from "../infrastructure/database/repositories/application.repository";

const t = initTRPC.create();

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

export const submitApplicationRouter = t.router({
	submit: t.procedure.input(submitApplicationInput).mutation(async ({ input }) => {
		return submitApplicationUseCase.execute(input);
	}),
});
