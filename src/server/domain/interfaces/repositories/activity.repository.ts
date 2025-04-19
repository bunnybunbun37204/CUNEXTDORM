import type { DormActivity } from "../../entities/dorm-activity.entity";

export interface ActivityRepository {
	findByUser(userId: string): Promise<DormActivity[]>;
	findByIds(ids: string[]): Promise<DormActivity[]>;
}
