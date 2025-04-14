import type { MaintenanceStatus } from "../enums/maintenance-status.enum";
import type { DormRoom } from "./dorm-room.entity";
import { User } from "./user.entity";
export class DormStaff extends User {
	manageRooms(action: string, dormRoom: DormRoom): void {
		// Logic to manage rooms
	}
	processMaintenanceRequest(logId: string, status: MaintenanceStatus): void {
		// Logic to process maintenance requests
	}
	generateReport(type: string): void {
		// Logic to generate reports
	}
}
