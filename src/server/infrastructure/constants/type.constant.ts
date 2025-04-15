import { UpdateProfileUseCase } from "../../application/usecases/update-profile.usecase";

// infrastructure/constants/types.ts
export const TYPES = {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	PrismaClient: Symbol.for("PrismaClient"),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	ActivityRepository: Symbol.for("ActivityRepository"),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	ApplicationRepository: Symbol.for("ApplicationRepository"),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	StudentRepository: Symbol.for("StudentRepository"),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	SubmitApplicationUseCase: Symbol.for("SubmitApplicationUseCase"),
	// biome-ignore lint/style/useNamingConvention: <explanation>
	UpdateProfileUseCase: Symbol.for("UpdateProfileUseCase"),
};
