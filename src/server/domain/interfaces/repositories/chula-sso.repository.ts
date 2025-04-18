// domain/interfaces/repositories/chula-sso.repository.ts
import type { User } from "../../entities/user.entity";
import type { UserRole } from "../../enums/user-role.enum";

export interface ChulaSsoRepository {
	validateToken(token: string): Promise<User>;
	getLoginUrl(): string;
	convertSsoRoles(roles: string[]): UserRole[];
}
