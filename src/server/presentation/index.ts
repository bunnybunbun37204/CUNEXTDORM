// src/trpc/app.ts หรือ src/trpc/index.ts
import { router } from "../infrastructure/protocol/trpc/trpc";
import { helloRouter } from "./applications/hello.application";
import { submitApplicationRouter } from "./applications/submit-application.application";

export const appRouter = router({
	hello: helloRouter,
	submitApplication: submitApplicationRouter,
});

export type AppRouter = typeof appRouter;
