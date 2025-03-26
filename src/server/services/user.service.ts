import { usersModel } from "../models/users.model";

export const userService = {
	async getUsers() {
		return usersModel.getUsers();
	},
	async addUser(input: { email: string; name?: string }) {
		return usersModel.addUser(input);
	},
};
