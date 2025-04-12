import { Container } from "inversify";
import type { ActivityRepository } from "../domain/interfaces/repositories/activity.repository";
import type { ApplicationRepository } from "../domain/interfaces/repositories/application.repository";
import { PrismaActivityRepository } from "./database/repositories/activity.repository";
import { PrismaApplicationRepository } from "./database/repositories/application.repository";

const container = new Container();

container.bind<ApplicationRepository>("ApplicationRepository").to(PrismaApplicationRepository);

container.bind<ActivityRepository>("ActivityRepository").to(PrismaActivityRepository);
