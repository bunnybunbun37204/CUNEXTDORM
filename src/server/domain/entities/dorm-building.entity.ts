import type { DormRoom } from "./dorm-room.entity";

export class DormBuilding {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly address: string,
		private createdAt: Date,
		private updatedAt: Date,
		private room: DormRoom[],
	) {}

	getId(): string {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getAddress(): string {
		return this.address;
	}

	getCreatedAt(): Date {
		return this.createdAt;
	}

	addRoom(room: DormRoom): void {
		this.room.push(room);
	}
	removeRoom(roomId: string): void {
		this.room = this.room.filter((room) => room.getId() !== roomId);
	}
	getRooms(): DormRoom[] {
		return this.room;
	}
}
