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
import { PrismaStudentRepository } from "../../database/repositories/student.repository";

const container = new Container();

// Bind Prisma Client เป็น Singleton
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

// Bind Repositories
container.bind<ActivityRepository>(TYPES.ActivityRepository).to(PrismaActivityRepository);
container.bind<ApplicationRepository>(TYPES.ApplicationRepository).to(PrismaApplicationRepository);
container.bind<StudentRepository>(TYPES.StudentRepository).to(PrismaStudentRepository);

// Bind Use Cases
container.bind<SubmitApplicationUseCase>(TYPES.SubmitApplicationUseCase).to(SubmitApplicationUseCase);
container.bind<UpdateProfileUseCase>(TYPES.UpdateProfileUseCase).to(UpdateProfileUseCase);

export default container;
