export class DormRoom {
	private readonly id: string;
	private roomNumber: string;
	private basePrice: number;
	private waterPrice: number;
	private electricPrice: number;
	private status: string;

	constructor(
		id: string,
		roomNumber: string,
		basePrice: number,
		waterPrice: number,
		electricPrice: number,
		status: string,
	) {
		this.id = id;
		this.roomNumber = roomNumber;
		this.basePrice = basePrice;
		this.waterPrice = waterPrice;
		this.electricPrice = electricPrice;
		this.status = status;
	}
	// Business Rule: คำนวณค่าใช้จ่ายทั้งหมด
	calculateTotalCost(waterUsed: number, electricUsed: number): number {
		return this.basePrice + waterUsed * this.waterPrice + electricUsed * this.electricPrice;
	}
	// Business Rule: อัพเดทสถานะห้อง
	updateStatus(newStatus: string): void {
		this.status = newStatus;
	}
	getId(): string {
		return this.id;
	}
	getRoomNumber(): string {
		return this.roomNumber;
	}
	getBasePrice(): number {
		return this.basePrice;
	}
	getWaterPrice(): number {
		return this.waterPrice;
	}
	getElectricPrice(): number {
		return this.electricPrice;
	}
	getStatus(): string {
		return this.status;
	}
	setRoomNumber(roomNumber: string): void {
		this.roomNumber = roomNumber;
	}
	setBasePrice(basePrice: number): void {
		this.basePrice = basePrice;
	}
	setWaterPrice(waterPrice: number): void {
		this.waterPrice = waterPrice;
	}
	setElectricPrice(electricPrice: number): void {
		this.electricPrice = electricPrice;
	}
	setStatus(status: string): void {
		this.status = status;
	}
}
