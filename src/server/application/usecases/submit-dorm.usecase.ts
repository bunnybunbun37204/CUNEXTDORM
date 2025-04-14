import { inject, injectable } from "inversify";
import { v4 as uuid } from "uuid";
import { DormApplication } from "../../domain/entities/dorm-application.entity";
import { ApplicationStatus } from "../../domain/enums/application-status.enum";
import type { ActivityRepository } from "../../domain/interfaces/repositories/activity.repository";
import type { ApplicationRepository } from "../../domain/interfaces/repositories/application.repository";
import { TYPES } from "../../infrastructure/constants/type.constant";
import type { SubmitApplicationDto } from "../dtos/submit-application.dto";

@injectable()
export class SubmitApplicationUseCase {
	constructor(
		@inject(TYPES.ApplicationRepository)
		private applicationRepository: ApplicationRepository,
		@inject(TYPES.ActivityRepository)
		private activityRepository: ActivityRepository,
	) {}

	async execute(dto: SubmitApplicationDto): Promise<DormApplication> {
		// สร้าง Application Entity ใหม่
		const application = new DormApplication(
			uuid(), // ID ที่สร้างขึ้นใหม่
			dto.applicantId, // จาก DTO
			dto.academicYear, // จาก DTO
			ApplicationStatus.Pending,
		);

		// ดึงกิจกรรมจาก Repository
		const activities = await this.activityRepository.findByUser(dto.applicantId);

		// เพิ่มกิจกรรมลงใน Application
		// TODO: Mock
		for (const activity of activities) {
			application.addActivity(activity);
		}
		application.validateActivityParticipation();
		// บันทึก Application
		return this.applicationRepository.save(application);
	}
}
