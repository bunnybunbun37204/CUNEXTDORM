import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { userService } from "./services/user.service";

const t = initTRPC.create();

export const appRouter = t.router({
	getUsers: t.procedure.query(async () => {
		return userService.getUsers();
	}),
	addUser: t.procedure
		.input(z.object({ email: z.string().email(), name: z.string().optional() }))
		.mutation(async ({ input }) => {
			console.log(input);
			return userService.addUser(input);
		}),
});

export type AppRouter = typeof appRouter;
