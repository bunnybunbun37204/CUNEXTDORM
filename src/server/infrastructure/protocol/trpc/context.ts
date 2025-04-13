// infrastructure/context.ts
import { PrismaClient } from "@prisma/client";
import { SubmitApplicationUseCase } from "../../../application/usecases/submit-dorm.usecase";
import { PrismaActivityRepository } from "../../database/repositories/activity.repository";
import { PrismaApplicationRepository } from "../../database/repositories/application.repository";

const prisma = new PrismaClient();

export const createContext = () => ({
	useCases: {
		submitApplication: new SubmitApplicationUseCase(
			new PrismaApplicationRepository(prisma),
			new PrismaActivityRepository(prisma),
		),
	},
});

export type Context = ReturnType<typeof createContext>;
