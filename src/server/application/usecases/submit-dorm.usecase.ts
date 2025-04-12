import { DormApplication } from "../../domain/entities/dorm-application.entity";
import { ApplicationStatus } from "../../domain/enums/application-status.enum";
import type { ActivityRepository } from "../../domain/interfaces/repositories/activity.repository";
import type { ApplicationRepository } from "../../domain/interfaces/repositories/application.repository";
import type { SubmitApplicationDto } from "../dtos/submit-application.dto";

export class SubmitApplicationUseCase {
	constructor(
		private readonly applicationRepo: ApplicationRepository,
		private readonly activityRepo: ActivityRepository,
	) {}

	async execute(dto: SubmitApplicationDto): Promise<DormApplication> {
		// สร้าง Application Entity ใหม่
		const application = new DormApplication(
			"12345", // ID ที่สร้างขึ้นใหม่
			dto.applicantId, // จาก DTO
			dto.academicYear, // จาก DTO
			ApplicationStatus.Pending,
		);

		// ดึงกิจกรรมจาก Repository
		const activities = await this.activityRepo.findByUser(dto.applicantId);

		// เพิ่มกิจกรรมลงใน Application
		for (const activity of activities) {
			application.addActivity(activity);
		}

		// บันทึก Application
		return this.applicationRepo.save(application);
	}
}
