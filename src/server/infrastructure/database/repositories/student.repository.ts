import { RentPayment } from "@/server/domain/entities/rent-payment.entity";
import type { PaymentStatus } from "@/server/domain/enums/payment-status.enum";
import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Student } from "../../../domain/entities/student.entity";
import type { StudentRepository } from "../../../domain/interfaces/repositories/student.repository";
import { TYPES } from "../../constants/type.constant";

@injectable()
export class PrismaStudentRepository implements StudentRepository {
	constructor(@inject(TYPES.PrismaClient) private readonly prisma: PrismaClient) {}
	async findById(id: string): Promise<Student | null> {
		const student = await this.prisma.user.findUnique({
			where: { id: id },
			include: {
				activities: true,
				agreements: true,
			},
		});
		const rentPayments = await this.prisma.rentPayment.findMany({
			where: { agreementId: student?.agreements[0].id },
		});
		if (student === null) return null;
		return new Student(
			student.id,
			student.email,
			student.name,
			student.phone ?? "",
			student.activities.map((activity) => ({
				id: activity.id,
				name: activity.name,
				description: activity.description ?? "",
				date: activity.date,
				maxPoints: activity.maxPoints,
			})),
			rentPayments.map(
				(payment) => new RentPayment(payment.id, payment.month, payment.totalAmount, payment.status as PaymentStatus),
			),
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
		return students.map((student) => new Student(student.id, student.email, student.name, student.phone ?? ""));
	}
	async findByEmail(email: string): Promise<Student | null> {
		const student = await this.prisma.user.findUnique({
			where: { email },
		});
		if (student === null) return null;
		return new Student(student.id, student.email, student.name, student.phone ?? "");
	}
	async save(student: Student): Promise<Student> {
		const saveStudent = await this.prisma.user.create({
			data: {
				id: student.getId(),
				email: student.getEmail(),
				name: student.getName(),
				phone: student.getPhone(),
				role: "TENANT",
			},
			include: {
				activities: true,
			},
		});
		return new Student(saveStudent.id, saveStudent.name, saveStudent.email, saveStudent.phone ?? "");
	}
	async update(student: Student): Promise<Student> {
		const updatedStudent = await this.prisma.user.update({
			where: { id: student.getId() },
			data: {
				email: student.getEmail(),
				name: student.getName(),
				phone: student.getPhone(),
				activities: {
					connect: student.getDormActivities().map((activity) => ({
						id: activity.id,
					})),
				},
			},
			include: {
				activities: true,
			},
		});
		return new Student(
			updatedStudent.id,
			updatedStudent.email,
			updatedStudent.name,
			updatedStudent.phone ?? "",
			updatedStudent.activities.map((activity) => ({
				id: activity.id,
				name: activity.name,
				description: activity.description ?? "",
				date: activity.date,
				maxPoints: activity.maxPoints,
			})),
		);
	}
	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id },
		});
	}
}
