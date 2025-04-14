import type { Student } from "../../entities/student.entity";

export interface StudentRepository {
	findById(id: string): Promise<Student | null>;
	findByIds(ids: string[]): Promise<Student[]>;
	findByEmail(email: string): Promise<Student | null>;
	save(student: Student): Promise<Student>;
	delete(id: string): Promise<void>;
}
