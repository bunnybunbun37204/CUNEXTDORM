import { PrismaClient } from "@prisma/client";
// infrastructure/container.ts
import { Container } from "inversify";
import { SubmitApplicationUseCase } from "../../../application/usecases/submit-dorm.usecase";
import type { ActivityRepository } from "../../../domain/interfaces/repositories/activity.repository";
import type { ApplicationRepository } from "../../../domain/interfaces/repositories/application.repository";
import { TYPES } from "../../constants/type.constant";
import { PrismaActivityRepository } from "../../database/repositories/activity.repository";
import { PrismaApplicationRepository } from "../../database/repositories/application.repository";

const container = new Container();

// Bind Prisma Client เป็น Singleton
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

// Bind Repositories
container.bind<ActivityRepository>(TYPES.ActivityRepository).to(PrismaActivityRepository);
container.bind<ApplicationRepository>(TYPES.ApplicationRepository).to(PrismaApplicationRepository);

// Bind Use Cases
container.bind<SubmitApplicationUseCase>(TYPES.SubmitApplicationUseCase).to(SubmitApplicationUseCase);

export default container;
