import { initTRPC } from "@trpc/server";
import { helloRouter } from "./hello.application";
import { submitApplicationRouter } from "./submit-application.application";

const t = initTRPC.create();

export const appRouter = t.router({
	hello: helloRouter,
	submitApplication: submitApplicationRouter,
});

export type AppRouter = typeof appRouter;
