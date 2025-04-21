import { trpc, trpcClient } from "@/lib/trpc-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function CallBack() {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<TicketCallback />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

function TicketCallback() {
	// Get ticket from URL during render
	const queryParams = new URLSearchParams(window.location.search);
	const ticket = queryParams.get("ticket");

	// Use useQuery at the top level with enabled option
	const result = trpc.authApplication.login.useQuery(
		{ ticket: ticket || "" },
		{
			enabled: !!ticket, // Only run query if ticket exists
			retry: false,
		},
	);

	// Handle query results
	useEffect(() => {
		if (result.data) {
			console.log("Login result:", result.data);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const data = result.data as any;
			const uid = data.id; // Replace 'id' with an existing property
			localStorage.setItem("uid", uid);
			window.location.href = "/"; // Redirect to home page
			// Handle successful login (e.g., redirect user)
		}
		if (result.error) {
			console.error("Login failed:", result.error);
			// Handle error
		}
	}, [result.data, result.error]);

	return null;
}
