import type { ApplicationStatus } from "../enums/application-status.enum";
import { ValidationError } from "../types/error.type";
import type { DormActivity } from "./dorm-activity.entity";
import type { DormQuestion } from "./dorm-questtion.entity";

// src/domain/entities/dorm-application.ts
export class DormApplication {
	private _answers: Map<string, string> = new Map();

	constructor(
		public readonly id: string,
		public readonly applicantId: string,
		public readonly academicYear: string,
		public status: ApplicationStatus,
		public activities: DormActivity[] = [],
	) {}

	// Business Rule 1: ต้องตอบคำถามบังคับทั้งหมด
	validateRequiredQuestions(questions: DormQuestion[]): void {
		console.info("Questions: ", questions);
		const requiredQuestions = questions.filter((q) => q.isRequired);
		for (const q of requiredQuestions) {
			if (!this._answers.has(q.id)) {
				throw new ValidationError(`ต้องตอบคำถาม: ${q.questionText}`);
			}
		}
	}

	// Business Rule 2: ต้องเข้าร่วมกิจกรรม 3 กิจกรรมขึ้นไป
	validateActivityParticipation(): void {
		if (this.activities.length < 3) {
			throw new ValidationError("ต้องเข้าร่วมกิจกรรมอย่างน้อย 3 กิจกรรม");
		}
	}

	addAnswer(questionId: string, answer: string): void {
		this._answers.set(questionId, answer);
	}

	addActivity(activity: DormActivity): void {
		this.activities.push(activity);
	}
}
