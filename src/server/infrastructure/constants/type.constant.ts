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

export const ENV = {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	DeeAppId: process.env.DEE_APP_ID,
	// biome-ignore lint/style/useNamingConvention: <explanation>
	DeeAppSecret: process.env.DEE_APP_SECRET,
	// biome-ignore lint/style/useNamingConvention: <explanation>
	AUTH_URL: process.env.AUTH_URL,
	// biome-ignore lint/style/useNamingConvention: <explanation>
	API_URL: process.env.API_URL,
};
