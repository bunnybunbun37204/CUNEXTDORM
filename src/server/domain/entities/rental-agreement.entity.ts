import { ValidationError } from "../types/error.type";

export class RentalAgreement {
	constructor(
		private readonly id: string,
		private startDate: Date,
		private endDate: Date,
		private montlyRent: number,
	) {
		this.endDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
	}
	getId(): string {
		return this.id;
	}
	getStartDate(): Date {
		return this.startDate;
	}
	getEndDate(): Date {
		return this.endDate;
	}
	getMontlyRent(): number {
		return this.montlyRent;
	}
	renewAgreement(newEndDate: Date): void {
		if (newEndDate > this.endDate) {
			this.endDate = newEndDate;
		} else {
			throw new ValidationError("New end date must be after the current end date.");
		}
	}
	terminateAgreement(): void {
		this.endDate = new Date();
	}
}
