import { DormRoom } from "../models/DormRoom.model";
import type { DormRoomRepository } from "../repositories/dorm.repository";

class DormManagementUseCase {
	constructor(private dormRepo: DormRoomRepository) {}

	async addNewRoom(buildingId: string, roomData: RoomDTO): Promise<DormRoom> {
		const building = await this.dormRepo.findBuilding(buildingId);
		const newRoom = new DormRoom({ ...roomData, building });
		return this.dormRepo.save(newRoom);
	}
}
