import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Student } from "../../../domain/entities/student.entity";
import { UserRole } from "../../../domain/enums/user-role.enum";
import type { StudentRepository } from "../../../domain/interfaces/repositories/student.repository";
import { TYPES } from "../../constants/type.constant";

@injectable()
export class PrismaStudentRepository implements StudentRepository {
	constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}
	async findById(id: string): Promise<Student | null> {
		const student = await this.prisma.user.findUnique({
			where: { id: id },
		});
		if (student === null) return null;
		return new Student(
			student.id,
			student.email,
			student.name,
			UserRole.Tenant,
			student.phone ?? "",
			student.createdAt,
			student.updatedAt,
			student.studentId ?? "",
		);
	}
	async findByIds(ids: string[]): Promise<Student[]> {
		const students = await this.prisma.user.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
		return students.map(
			(student) =>
				new Student(
					student.id,
					student.email,
					student.name,
					UserRole.Tenant,
					student.phone ?? "",
					student.createdAt,
					student.updatedAt,
					student.studentId ?? "",
				),
		);
	}
	async findByEmail(email: string): Promise<Student | null> {
		const student = await this.prisma.user.findUnique({
			where: { email },
		});
		if (student === null) return null;
		return new Student(
			student.id,
			student.email,
			student.name,
			UserRole.Tenant,
			student.phone ?? "",
			student.createdAt,
			student.updatedAt,
			student.studentId ?? "",
		);
	}
	async save(student: Student): Promise<Student> {
		const saveStudent = await this.prisma.user.create({
			data: {
				email: student.getEmail(),
				name: student.getName(),
				phone: student.getPhone(),
				studentId: student.getStudentId(),
				role: "TENANT",
			},
		});
		return new Student(
			saveStudent.id,
			saveStudent.email,
			saveStudent.name,
			UserRole.Tenant,
			saveStudent.phone ?? "",
			saveStudent.createdAt,
			saveStudent.updatedAt,
			saveStudent.studentId ?? "",
		);
	}
	async update(student: Student): Promise<Student> {
		const updatedStudent = await this.prisma.user.update({
			where: { id: student.getId() },
			data: {
				email: student.getEmail(),
				name: student.getName(),
				phone: student.getPhone(),
				studentId: student.getStudentId(),
			},
		});
		return new Student(
			updatedStudent.id,
			updatedStudent.email,
			updatedStudent.name,
			UserRole.Tenant,
			updatedStudent.phone ?? "",
			updatedStudent.createdAt,
			updatedStudent.updatedAt,
			updatedStudent.studentId ?? "",
		);
	}
	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id },
		});
	}
}
