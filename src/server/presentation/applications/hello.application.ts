import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../base";

export const helloRouter = router({
	greeting: publicProcedure.input(z.string()).query(({ input }) => `Hello ${input}`),
});
