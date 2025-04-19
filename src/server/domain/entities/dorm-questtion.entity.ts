import type { QuestionType } from "../enums/question-type.enum";

export class DormQuestion {
	constructor(
		public readonly id: string,
		public readonly questionText: string,
		public readonly isRequired: boolean,
		public readonly questionType: QuestionType,
		public readonly options?: string[], // Only for multiple choice questions
	) {}
}
