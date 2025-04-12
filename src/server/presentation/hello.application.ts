import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const helloRouter = t.router({
	greeting: t.procedure.input(z.string()).query(({ input }) => `Hello ${input}`),
});
