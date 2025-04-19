import type { AuthUseCase } from "@/server/application/usecases/auth.usecase";
import type { SubmitApplicationUseCase } from "../../../application/usecases/submit-dorm.usecase";
import type { UpdateProfileUseCase } from "../../../application/usecases/update-profile.usecase";
// infrastructure/context.ts
import container from "../../adapters/inversify/container.infrastructure";
import { TYPES } from "../../constants/type.constant";

export const createContext = () => ({
	useCases: {
		submitApplication: container.get<SubmitApplicationUseCase>(TYPES.SubmitApplicationUseCase),
		updateProfile: container.get<UpdateProfileUseCase>(TYPES.UpdateProfileUseCase),
		auth: container.get<AuthUseCase>(TYPES.AuthUseCase),
	},
});

export type Context = ReturnType<typeof createContext>;
