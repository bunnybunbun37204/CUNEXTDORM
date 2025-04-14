import type { UserRole } from "../enums/user-role.enum";

export class User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	studentId?: string;

	constructor(id: string, email: string, name: string, role: UserRole, studentId?: string) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.role = role;
		this.studentId = studentId;
	}
	login(credentials: string): boolean {
		// Login logic
		return true;
	}
	reportIssue(description: string): void {
		// Issue reporting logic
	}
	viewNotifications(): void {
		// Notification viewing logic
	}
	submitApplication(): void {
		// Application submission logic
	}
	makePayment(agreementId: string): void {
		// Payment logic
	}
	manageRooms(): void {
		// Room management logic
	}
}
