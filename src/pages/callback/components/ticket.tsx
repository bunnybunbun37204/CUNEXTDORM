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
	useEffect(() => {
		// Get the current URL search parameters
		const queryParams = new URLSearchParams(window.location.search);
		// Extract the ticket parameter
		const ticket = queryParams.get("ticket");
		const result = trpc.authApplication.login.useQuery({ ticket: ticket || "" });
		if (ticket) {
			console.log("Result", result.data);
			console.log("Found ticket:", ticket);
		} else {
			console.log("No ticket parameter in URL");
		}
	}, []); // Empty dependency array = runs only once on mount

	return null; // This component doesn't render anything
}
