import type { SubmitApplicationUseCase } from "../../../application/usecases/submit-dorm.usecase";
import type { UpdateProfileUseCase } from "../../../application/usecases/update-profile.usecase";
// infrastructure/context.ts
import container from "../../adapters/inversify/container.infrastructure";
import { TYPES } from "../../constants/type.constant";

export const createContext = () => ({
	useCases: {
		submitApplication: container.get<SubmitApplicationUseCase>(TYPES.SubmitApplicationUseCase),
		updateProfile: container.get<UpdateProfileUseCase>(TYPES.UpdateProfileUseCase),
	},
});

export type Context = ReturnType<typeof createContext>;
