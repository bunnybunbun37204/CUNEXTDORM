import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// components/application-form.tsx
import { useState } from "react";
import { trpc, trpcClient } from "../lib/trpc-react";

const queryClient = new QueryClient();

export function Users() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ApplicationForm />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export function ApplicationForm() {
	const [applicantId, setApplicantId] = useState("");
	const [academicYear, setAcademicYear] = useState("");
	const [answers, setAnswers] = useState<{ questionId: string; answerText: string }[]>([]);

	const submitApplication = trpc.submitApplication.submit.useMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await submitApplication.mutateAsync({
				applicantId,
				academicYear,
				answers,
			});
			alert("Application submitted successfully!");
			// Reset form
			setApplicantId("");
			setAcademicYear("");
			setAnswers([]);
		} catch (error) {
			console.error("Submission error:", error);
		}
	};

	const addAnswer = () => {
		setAnswers([...answers, { questionId: "", answerText: "" }]);
	};

	return (
		<div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4">Dorm Application</h2>
			<div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label htmlFor="applicant-id" className="text-sm font-medium text-gray-700 mb-1">
							Applicant ID
						</label>
						<input
							id="applicant-id"
							type="text"
							value={applicantId}
							onChange={(e) => setApplicantId(e.target.value)}
							className="w-full px-4 py-2 border rounded-md"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="academic-year" className="text-sm font-medium text-gray-700 mb-1">
							Academic Year
						</label>
						<input
							id="academic-year"
							type="text"
							value={academicYear}
							onChange={(e) => setAcademicYear(e.target.value)}
							className="w-full px-4 py-2 border rounded-md"
							required
						/>
					</div>

					<div className="space-y-4">
						{answers.map((answer, index) => (
							<div key={index.toString()} className="flex gap-4">
								<input
									type="text"
									placeholder="Question ID"
									value={answer.questionId}
									onChange={(e) => {
										const newAnswers = [...answers];
										newAnswers[index].questionId = e.target.value;
										setAnswers(newAnswers);
									}}
									className="flex-1 px-4 py-2 border rounded-md"
								/>
								<input
									type="text"
									placeholder="Answer"
									value={answer.answerText}
									onChange={(e) => {
										const newAnswers = [...answers];
										newAnswers[index].answerText = e.target.value;
										setAnswers(newAnswers);
									}}
									className="flex-1 px-4 py-2 border rounded-md"
								/>
							</div>
						))}
						<button type="button" onClick={addAnswer} className="text-blue-600 hover:text-blue-800 text-sm">
							+ Add Question Answer
						</button>
					</div>

					<button
						type="submit"
						disabled={submitApplication.isPending}
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
					>
						{submitApplication.isPending ? "Submitting..." : "Submit Application"}
					</button>

					{submitApplication.error && (
						<div className="text-red-600 text-sm mt-2">Error: {submitApplication.error.message}</div>
					)}
				</form>
			</div>
		</div>
	);
}
