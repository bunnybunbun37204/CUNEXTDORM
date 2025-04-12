import type { PrismaClient } from "@prisma/client";
import { DormActivity } from "../../../domain/entities/dorm-activity.entity";
import type { ActivityRepository } from "../../../domain/interfaces/repositories/activity.repository";

export class PrismaActivityRepository implements ActivityRepository {
	constructor(private readonly prisma: PrismaClient) {}
	async findByUser(userId: string): Promise<DormActivity[]> {
		const activities = await this.prisma.dormActivity.findMany({
			where: { id: userId },
		});
		return activities.map(
			(activity) =>
				new DormActivity(
					activity.id,
					activity.name,
					activity.description ?? "",
					activity.date,
					activity.maxPoints,
					"Unknown Location", // Replace with actual location if available
					0, // Replace with actual participants count if available
				),
		);
	}
	async findByIds(ids: string[]): Promise<DormActivity[]> {
		const activities = await this.prisma.dormActivity.findMany({
			where: { id: { in: ids } },
		});
		return activities.map(
			(activity) =>
				new DormActivity(
					activity.id,
					activity.name,
					activity.description ?? "",
					activity.date,
					activity.maxPoints,
					"Unknown Location", // Replace with actual location if available
					0, // Replace with actual participants count if available
				),
		);
	}
}
