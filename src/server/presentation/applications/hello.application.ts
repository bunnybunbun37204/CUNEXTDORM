import { z } from "zod";
import { publicProcedure, router } from "../../infrastructure/protocol/trpc/trpc";

export const helloRouter = router({
	greeting: publicProcedure.input(z.string()).query(({ input }) => `Hello ${input}`),
});
