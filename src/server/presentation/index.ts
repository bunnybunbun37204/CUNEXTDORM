// src/trpc/app.ts หรือ src/trpc/index.ts
import { helloRouter } from "./applications/hello.application";
import { submitApplicationRouter } from "./applications/submit-application.application";
import { router } from "./base";

export const appRouter = router({
	hello: helloRouter,
	submitApplication: submitApplicationRouter,
});

export type AppRouter = typeof appRouter;
