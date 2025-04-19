import { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
export { renderers } from "../../../renderers.mjs";

const prisma = new PrismaClient();
const userService = {
	async getUsers() {
		return prisma.user.findMany();
	},
	async addUser(input) {
		return await prisma.user.create({
			data: {
				email: input.email,
				name: input.name,
			},
		});
	},
};

const t = initTRPC.create();
const appRouter = t.router({
	getUsers: t.procedure.query(async () => {
		return userService.getUsers();
	}),
	addUser: t.procedure.input(z.object({ email: z.string().email(), name: z.string() })).mutation(async ({ input }) => {
		console.log(input);
		return userService.addUser(input);
	}),
});

const ALL = async ({ request }) => {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req: request,
		router: appRouter,
	});
};

const _page = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			ALL,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

const page = () => _page;

export { page };
