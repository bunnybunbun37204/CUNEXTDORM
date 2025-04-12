import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc, trpcClient } from "../lib/trpc-react";

const queryClient = new QueryClient();

export function Users() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<UsersForm />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

function UsersForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	const addSubmitApplication = trpc.submitApplication.submit.useMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await addSubmitApplication.mutateAsync({
				applicantId: "6b92653e-3eae-4fd5-a46b-a4ce07f5872c",
				academicYear: "2023-2024",
				answers: [
					{
						questionId: "1",
						answerText: name,
					},
				],
			});
			alert("User added successfully!");
			setEmail("");
			setName("");
		} catch (error) {
			console.error("Error adding user:", error);
			alert("Failed to add user.");
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>
			<div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-lg">
				<h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Add User</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<button
						type="submit"
						disabled={addSubmitApplication.isPending}
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{addSubmitApplication.isPending ? "Adding..." : "Add User"}
					</button>
				</form>
			</div>
		</div>
	);
}
