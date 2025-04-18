import { v4 as uuid } from "uuid";
import { MaintenanceStatus } from "../enums/maintenance-status.enum";
import type { RepairType } from "../enums/repair-type.enum";
import type { UserRole } from "../enums/user-role.enum";
import { MaintenanceLog } from "./maintainnance-log.entity";

export class User {
	private readonly id: string;
	private email: string;
	private name: string;
	private role: UserRole;
	private phone: string;
	createdAt: Date;
	updatedAt: Date;
	private studentId?: string;

	constructor(
		id: string,
		email: string,
		name: string,
		role: UserRole,
		phone?: string,
		createdAt?: Date,
		updatedAt?: Date,
		studentId?: string,
	) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.role = role;
		this.studentId = studentId;
		this.phone = phone ?? "";
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}

	login(credentials: string): boolean {
		// Login logic
		return true;
	}
	updateProfile(name: string, email: string, phone: string): void {
		this.name = name;
		this.email = email;
		this.phone = phone;
	}

	submitMaintenanceRequest(description: string, repairType: RepairType): MaintenanceLog {
		// Logic to submit a maintenance request
		return new MaintenanceLog(uuid(), description, repairType, MaintenanceStatus.Pending);
	}

	getId(): string {
		return this.id;
	}
	getEmail(): string {
		return this.email;
	}
	getName(): string {
		return this.name;
	}
	getRole(): UserRole {
		return this.role;
	}
	getPhone(): string {
		return this.phone;
	}
	getStudentId(): string | undefined {
		return this.studentId;
	}

	// Setter
	setEmail(email: string): void {
		this.email = email;
	}
	setName(name: string): void {
		this.name = name;
	}
	setRole(role: UserRole): void {
		this.role = role;
	}
	setPhone(phone: string): void {
		this.phone = phone;
	}
	setStudentId(studentId: string): void {
		this.studentId = studentId;
	}
}
