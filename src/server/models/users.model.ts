import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersModel = {
	async getUsers() {
		return prisma.user.findMany();
	},
	async addUser(input: { email: string; name?: string }) {
		return prisma.user.create({ data: input });
	},
};
