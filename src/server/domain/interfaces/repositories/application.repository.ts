import type { DormApplication } from "../../entities/dorm-application.entity";

// src/domain/interfaces/repositories/application.repository.ts
export interface ApplicationRepository {
	save(app: DormApplication): Promise<DormApplication>;
	findById(id: string): Promise<DormApplication | null>;
	findByApplicant(userId: string): Promise<DormApplication[]>;
}

// src/domain/interfaces/repositories/activity.repository.ts
