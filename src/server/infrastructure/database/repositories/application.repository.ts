import { ApplicationStatus, type PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { DormActivity } from "../../../domain/entities/dorm-activity.entity";
import { DormApplication } from "../../../domain/entities/dorm-application.entity";
import type { ApplicationStatus as EnumApplicationStatus } from "../../../domain/enums/application-status.enum";
import type { ApplicationRepository } from "../../../domain/interfaces/repositories/application.repository";
import { TYPES } from "../../constants/type.constant";

@injectable()
export class PrismaApplicationRepository implements ApplicationRepository {
	constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}
	async save(app: DormApplication): Promise<DormApplication> {
		const { id, applicantId, academicYear, activities } = app;
		const activityConnections = activities.map((activity) => ({
			id: activity.id,
		}));
		const savedApp = await this.prisma.extensionApplication.create({
			data: {
				id,
				applicantId,
				academicYear,
				status: ApplicationStatus.PENDING,
				activities: {
					connect: activityConnections,
				},
			},
			include: {
				activities: true,
			},
		});
		return new DormApplication(
			savedApp.id,
			savedApp.applicantId,
			savedApp.academicYear,
			savedApp.status as EnumApplicationStatus,
			savedApp.activities.map(
				(a) =>
					new DormActivity(
						a.id,
						a.name,
						"",
						a.date,
						a.maxPoints,
						"Unknown Location", // Replace with actual location if available
						0, // Replace with actual participants count if available
					),
			),
		);
	}
	async findById(id: string): Promise<DormApplication | null> {
		const app = await this.prisma.extensionApplication.findUnique({
			where: { id },
		});
		if (!app) return null;
		return new DormApplication(app.id, app.applicantId, app.academicYear, app.status as EnumApplicationStatus);
	}
	async findByApplicant(userId: string): Promise<DormApplication[]> {
		const apps = await this.prisma.extensionApplication.findMany({
			where: { applicantId: userId },
		});
		return apps.map(
			(app) => new DormApplication(app.id, app.applicantId, app.academicYear, app.status as EnumApplicationStatus),
		);
	}
}
