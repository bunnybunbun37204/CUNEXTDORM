import { Student } from "@/server/domain/entities/student.entity";
import type { User } from "@/server/domain/entities/user.entity";
import type { ChulaSsoRepository } from "@/server/domain/interfaces/repositories/chula-sso.repository";
import type { StudentRepository } from "@/server/domain/interfaces/repositories/student.repository";
import { TYPES } from "@/server/infrastructure/constants/type.constant";
import { inject, injectable } from "inversify";

@injectable()
export class AuthUseCase {
	constructor(
		@inject(TYPES.ChulaSsoRepository) private chulaSsoRepository: ChulaSsoRepository,
		@inject(TYPES.StudentRepository) private studentRepository: StudentRepository,
	) {}
	async getLoginUrl(): Promise<string> {
		const url = this.chulaSsoRepository.getLoginUrl();
		return url;
	}
	async login(token: string): Promise<User> {
		const result = await this.chulaSsoRepository.validateToken(token);
		const user = await this.studentRepository.findByEmail(result.getEmail());
		if (user === null) {
			const newUser = new Student(result.getId(), result.getEmail(), result.getName(), result.getPhone());
			await this.studentRepository.save(newUser);
			return newUser;
		}
		return user;
	}
}
