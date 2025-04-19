import { AuthUseCase } from "@/server/application/usecases/auth.usecase";
import type { ChulaSsoRepository } from "@/server/domain/interfaces/repositories/chula-sso.repository";
import { PrismaClient } from "@prisma/client";
// infrastructure/container.ts
import { Container } from "inversify";
import { SubmitApplicationUseCase } from "../../../application/usecases/submit-dorm.usecase";
import { UpdateProfileUseCase } from "../../../application/usecases/update-profile.usecase";
import type { ActivityRepository } from "../../../domain/interfaces/repositories/activity.repository";
import type { ApplicationRepository } from "../../../domain/interfaces/repositories/application.repository";
import type { StudentRepository } from "../../../domain/interfaces/repositories/student.repository";
import { TYPES } from "../../constants/type.constant";
import { PrismaActivityRepository } from "../../database/repositories/activity.repository";
import { PrismaApplicationRepository } from "../../database/repositories/application.repository";
import { PrismaChulaSsoRepository } from "../../database/repositories/chula-sso.repository";
import { PrismaStudentRepository } from "../../database/repositories/student.repository";
import { AxiosHttpClient } from "../../protocol/http/axios-http-client";
import type { ChulaSsoConfig } from "../../protocol/http/chula-sso.config";
import type { HttpClient } from "../../protocol/http/http-client";

const container = new Container();

// Bind Prisma Client เป็น Singleton
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
container.bind<HttpClient>(TYPES.HttpClient).to(AxiosHttpClient);
container.bind<ChulaSsoConfig>(TYPES.ChulaSsoConfig).toConstantValue({
	apiUrl:
		process.env.API_URL ??
		(() => {
			throw new Error("API_URL is not defined");
		})(),
	deeAppId:
		process.env.DEE_APP_ID ??
		(() => {
			throw new Error("DEE_APP_ID is not defined");
		})(),
	deeAppSecret:
		process.env.DEE_APP_SECRET ??
		(() => {
			throw new Error("DEE_APP_SECRET is not defined");
		})(),
	authUrl:
		process.env.AUTH_URL ??
		(() => {
			throw new Error("AUTH_URL is not defined");
		})(),
});
// Bind Repositories
container.bind<ActivityRepository>(TYPES.ActivityRepository).to(PrismaActivityRepository);
container.bind<ApplicationRepository>(TYPES.ApplicationRepository).to(PrismaApplicationRepository);
container.bind<StudentRepository>(TYPES.StudentRepository).to(PrismaStudentRepository);
container.bind<ChulaSsoRepository>(TYPES.ChulaSsoRepository).to(PrismaChulaSsoRepository);

// Bind Use Cases
container.bind<SubmitApplicationUseCase>(TYPES.SubmitApplicationUseCase).to(SubmitApplicationUseCase);
container.bind<UpdateProfileUseCase>(TYPES.UpdateProfileUseCase).to(UpdateProfileUseCase);
container.bind<AuthUseCase>(TYPES.AuthUseCase).to(AuthUseCase);

export default container;
