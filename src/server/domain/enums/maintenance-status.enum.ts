export enum MaintenanceStatus {
	// The maintenance request has been submitted but not yet processed.
	Pending = "PENDING",
	// The maintenance request is currently being worked on.
	InProgress = "IN_PROGRESS",
	// The maintenance request has been completed.
	Completed = "COMPLETED",
	// The maintenance request has been canceled.
	Canceled = "CANCELED",
}
