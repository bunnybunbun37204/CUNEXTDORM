import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { SubmitApplicationUseCase } from "./application/usecases/submit-dorm.usecase";
import { PrismaActivityRepository } from "./infrastructure/database/repositories/activity.repository";
import { PrismaApplicationRepository } from "./infrastructure/database/repositories/application.repository";

const t = initTRPC.create();
const prisma = new PrismaClient();
const activityRepo = new PrismaActivityRepository(prisma);
const applicationRepo = new PrismaApplicationRepository(prisma);
const activityUsecase = new SubmitApplicationUseCase(applicationRepo, activityRepo);

export const appRouter = t.router({
	hello: t.procedure.input(z.string()).query((opts) => {
		return `Hello ${opts.input}`;
	}),
	submitApplication: t.procedure
		.input(
			z.object({
				applicantId: z.string(),
				academicYear: z.string(),
				answers: z.array(
					z.object({
						questionId: z.string(),
						answerText: z.string(),
					}),
				),
			}),
		)
		.mutation(async (opts) => {
			const { applicantId, academicYear, answers } = opts.input;
			const application = await activityUsecase.execute({
				applicantId,
				academicYear,
				answers,
			});
			return application;
		}),
});

export type AppRouter = typeof appRouter;
