import { ApplicationStatus, type PrismaClient } from "@prisma/client";
import { DormApplication } from "../../../domain/entities/dorm-application.entity";
import type { ApplicationStatus as EnumApplicationStatus } from "../../../domain/enums/application-status.enum";
import type { ApplicationRepository } from "../../../domain/interfaces/repositories/application.repository";

export class PrismaApplicationRepository implements ApplicationRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async save(app: DormApplication): Promise<DormApplication> {
		const { id, applicantId, academicYear } = app;
		const savedApp = await this.prisma.extensionApplication.create({
			data: {
				id,
				applicantId,
				academicYear,
				status: ApplicationStatus.PENDING,
			},
		});
		return new DormApplication(
			savedApp.id,
			savedApp.applicantId,
			savedApp.academicYear,
			savedApp.status as EnumApplicationStatus,
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
