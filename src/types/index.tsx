export interface PersonalInfo {
	fullName: string;
	nickname: string;
	province: string;
	studentId: string;
	faculty: string;
	department: string;
	email: string;
	phone: string;
	building: string;
	room: string;
	educationYear: string;
	gpa: string;
	status: string;
	academicYear: string;
	bed: string;
	acNumber: string;
	floor: string;
}

export type BillStatus = "paid" | "pending" | "unpaid";

export interface Bill {
	id: string;
	month: string;
	year: number;
	status: BillStatus;
}

export interface BillItem {
	amount: number;
	date: string;
}

export interface BillList {
	data: BillItem[];
}

export interface FinancialSummaryData {
	rent: {
		amount: number;
		date: string;
	}[];
	electricity: {
		amount: number;
		date: string;
	}[];
	water: {
		amount: number;
		date: string;
	}[];
}
export const statusMap: Record<BillStatus, { color: string; text: string }> = {
	paid: { color: "text-green-600", text: "ชำระแล้ว" },
	pending: { color: "text-orange-500", text: "รอดำเนินการ" },
	unpaid: { color: "text-red-500", text: "ค้างชำระ" },
};
