import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../server/infrastructure/protocol/trpc/context";
import { appRouter } from "../../../server/presentation/index";
export const ALL = async ({ request }: { request: Request }) => {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req: request,
		router: appRouter,
		createContext: createContext,
	});
};
