import type { DormRoom as DormRoomProps } from "@prisma/client";

export class DormRoom extends Model<DormRoomProps> {
  markUnderMaintenance() {
    this.props.isUnderMaintenance = true;
  }
}
