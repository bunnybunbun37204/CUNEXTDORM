import { UserRole } from "../enums/user-role.enum";
import type { DormActivity } from "./dorm-activity.entity";
import type { RentPayment } from "./rent-payment.entity";
import { User } from "./user.entity";

export class Student extends User {
	constructor(
		id: string,
		name: string,
		email: string,
		phone: string,
		private dormActivities?: DormActivity[],
		private rentPayments?: RentPayment[],
	) {
		super(id, name, email, UserRole.Tenant, phone);
		super.setRole(UserRole.Tenant);
	}

	viewPaymentHistory(): RentPayment[] {
		if (!this.rentPayments) return [];
		return this.rentPayments;
	}
	participateActivities(activity: DormActivity): void {
		// Logic to participate in activities
		// e.g., register for an event
		if (!this.dormActivities) return;
		this.dormActivities.push(activity);
	}
	getDormActivities(): DormActivity[] {
		if (!this.dormActivities) return [];
		return this.dormActivities;
	}
}
