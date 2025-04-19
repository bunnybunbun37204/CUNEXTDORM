import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "../server/presentation/index";

import { httpBatchLink } from "@trpc/client";
const url =
	process.env.NODE_ENV === "production" ? "https://cunextdorm.vercel.app/api/trpc" : "http://localhost:4321/api/trpc";
export const trpc = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: url,
		}),
	],
});
