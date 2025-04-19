import { router } from "../infrastructure/protocol/trpc/trpc";
import { authRouter } from "./applications/auth.application";
import { helloRouter } from "./applications/hello.application";
import { studentRouter } from "./applications/student.application";
import { submitApplicationRouter } from "./applications/submit-application.application";

export const appRouter = router({
	hello: helloRouter,
	submitApplication: submitApplicationRouter,
	studentApplication: studentRouter,
	authApplication: authRouter,
});

export type AppRouter = typeof appRouter;
