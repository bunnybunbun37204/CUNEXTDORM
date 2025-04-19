import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server/presentation/index"; // Import the AppRouter type

export const trpc = createTRPCReact<AppRouter>(); // Create React tRPC instance
const url =
	process.env.NODE_ENV === "production" ? "https://cunextdorm.vercel.app/api/trpc" : "http://localhost:4321/api/trpc";

// ✅ Export the tRPC client
export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: url, // Ensure this is correct
		}),
	],
});
