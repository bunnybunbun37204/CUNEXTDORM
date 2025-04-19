import type { MaintenanceStatus } from "../enums/maintenance-status.enum";
import type { RepairType } from "../enums/repair-type.enum";
import type { User } from "./user.entity";

export class MaintenanceLog {
	constructor(
		private readonly id: string,
		private description: string,
		private repairType: RepairType,
		private status: MaintenanceStatus,
	) {}

	assignTechnician(technician: User): void {
		// Logic to assign technician
	}

	updateStatus(newStatus: MaintenanceStatus): void {
		this.status = newStatus;
	}

	getId(): string {
		return this.id;
	}
	getDescription(): string {
		return this.description;
	}
	getRepairType(): RepairType {
		return this.repairType;
	}
	getStatus(): MaintenanceStatus {
		return this.status;
	}
	setDescription(description: string): void {
		this.description = description;
	}
	setRepairType(repairType: RepairType): void {
		this.repairType = repairType;
	}
	setStatus(status: MaintenanceStatus): void {
		this.status = status;
	}
}
