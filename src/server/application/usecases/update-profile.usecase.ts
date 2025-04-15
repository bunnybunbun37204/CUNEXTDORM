import { inject, injectable } from "inversify";
import type { Student } from "../../domain/entities/student.entity";
import type { StudentRepository } from "../../domain/interfaces/repositories/student.repository";
import { NotFoundError } from "../../domain/types/error.type";
import { TYPES } from "../../infrastructure/constants/type.constant";
import type { UpdateProfileDto } from "../dtos/update-profile.dto";

@injectable()
export class UpdateProfileUseCase {
	constructor(
		@inject(TYPES.StudentRepository)
		private studentRepository: StudentRepository,
	) {}

	async execute(dto: UpdateProfileDto): Promise<Student> {
		const student = await this.studentRepository.findById(dto.id);
		if (student === null) throw new NotFoundError("Student not found");
		student.updateProfile(
			dto.name ?? student.getName(),
			dto.email ?? student.getEmail(),
			dto.phone ?? student.getPhone(),
		);
		return this.studentRepository.update(student);
	}
}
