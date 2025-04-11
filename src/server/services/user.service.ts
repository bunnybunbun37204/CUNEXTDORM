import { PrismaClient } from "@prisma/client";

// import { usersModel } from "../models/Users.model";
const prisma = new PrismaClient();

export const userService = {
	async getUsers() {
		return prisma.user.findMany();
	},
	async addUser(input: { email: string; name: string }) {
		return await prisma.user.create({
			data: {
				email: input.email,
				name: input.name,
			},
		});
	},
};
