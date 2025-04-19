import type { DormActivity } from "./dorm-activity.entity";
import { User } from "./user.entity";

export class Student extends User {
	private dormactivities: DormActivity[] = [];
	viewPaymentHistory(): void {
		// Logic to view payment history
	}
	participateActivities(activity: DormActivity): void {
		// Logic to participate in activities
		// e.g., register for an event
		this.dormactivities.push(activity);
	}
	getDormActivities(): DormActivity[] {
		return this.dormactivities;
	}
}
