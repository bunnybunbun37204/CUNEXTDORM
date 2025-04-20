import type { NotificationType } from "../enums/notification-type.enum";

export class Notification {
	constructor(
		private readonly id: string,
		private notificationType: NotificationType,
	) {}
}
