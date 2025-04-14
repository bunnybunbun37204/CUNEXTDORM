import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import type { Student } from "../../../domain/entities/student.entity";
import type { StudentRepository } from "../../../domain/interfaces/repositories/student.repository";
import { TYPES } from "../../constants/type.constant";

@injectable()
export class PrismaStudentRepository implements StudentRepository {
	constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}
	findById(id: string): Promise<Student | null> {
		throw new Error("Method not implemented.");
	}
	findByIds(ids: string[]): Promise<Student[]> {
		throw new Error("Method not implemented.");
	}
	findByEmail(email: string): Promise<Student | null> {
		throw new Error("Method not implemented.");
	}
	save(student: Student): Promise<Student> {
		throw new Error("Method not implemented.");
	}
	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
