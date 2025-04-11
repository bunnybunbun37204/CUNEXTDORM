import type { DormRoom } from "../models/DormRoom.model";

export interface DormRoomRepository {
  findById(id: string): Promise<DormRoom>;
  findBuilding(id: string): Promise<DormRoom>;
  save(dorm: DormRoom): Promise<void>;
}
