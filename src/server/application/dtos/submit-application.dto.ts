export interface SubmitApplicationDto {
	applicantId: string;
	academicYear: string;
	answers: {
		questionId: string;
		answerText: string;
	}[];
}
