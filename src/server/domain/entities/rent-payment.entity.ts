import { PaymentStatus } from "../enums/payment-status.enum";

export class RentPayment {
	constructor(
		private readonly id: string,
		private readonly month: Date,
		private totalAmount: number,
		private status: PaymentStatus,
	) {}

	getId(): string {
		return this.id;
	}
	getMonth(): Date {
		return this.month;
	}
	getTotalAmount(): number {
		return this.totalAmount;
	}
	getStatus(): PaymentStatus {
		return this.status;
	}

	processPayment(amount: number): boolean {
		if (amount >= this.totalAmount) {
			this.status = PaymentStatus.Resolved;
			return true;
		}
		return false;
	}

	generateReceipt(): string {
		return `Receipt for payment of ${this.totalAmount} for month ${this.month.toLocaleDateString()}. Status: ${this.status}`;
	}
}
