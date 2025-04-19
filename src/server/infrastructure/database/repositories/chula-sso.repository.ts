// infrastructure/database/repositories/prisma-chula-sso.repository.ts
import { inject, injectable } from "inversify";
import { User } from "../../../domain/entities/user.entity";
import { UserRole } from "../../../domain/enums/user-role.enum";
import type { ChulaSsoRepository } from "../../../domain/interfaces/repositories/chula-sso.repository";
import { InternalServerError, UnauthorizedError, ValidationError } from "../../../domain/types/error.type";
import { TYPES } from "../../constants/type.constant";
import type { ChulaSsoConfig } from "../../protocol/http/chula-sso.config";
import type { HttpClient } from "../../protocol/http/http-client";

interface ChulaSsoResponse {
	uid: string;
	username: string;
	gecos: string;
	email: string;
	roles: string[];
	ouid: string;
}

@injectable()
export class PrismaChulaSsoRepository implements ChulaSsoRepository {
	constructor(
		@inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
		@inject(TYPES.ChulaSsoConfig) private readonly config: ChulaSsoConfig,
	) {
		this.validateConfiguration();
	}

	private validateConfiguration(): void {
		if (!this.config.apiUrl || !this.config.authUrl) {
			throw new InternalServerError("SSO configuration is incomplete");
		}
	}

	public async validateToken(token: string): Promise<User> {
		try {
			this.validateTokenInput(token);
			console.info("Validating token with SSO");
			console.info(`Token: ${token}`);
			const response = await this.httpClient.post<ChulaSsoResponse>(
				`${this.config.apiUrl}/serviceValidation`,
				this.buildRequestHeaders(token),
			);
			console.info("Building request headers:", this.buildRequestHeaders(token));
			console.info("Token validation response:", response);
			return this.mapToUserDomain(response.data);
		} catch (error) {
			this.handleError(error);
		}
	}

	private validateTokenInput(token: string): void {
		if (!token?.trim()) {
			throw new ValidationError("Token is required");
		}
	}

	private buildRequestHeaders(token: string): Record<string, string> {
		return {
			// biome-ignore lint/style/useNamingConvention: <explanation>
			DeeAppId: this.config.deeAppId,
			// biome-ignore lint/style/useNamingConvention: <explanation>
			DeeAppSecret: this.config.deeAppSecret,
			// biome-ignore lint/style/useNamingConvention: <explanation>
			DeeTicket: token,
			"Content-Type": "application/json",
		};
	}

	private mapToUserDomain(response: ChulaSsoResponse): User {
		return new User(response.ouid, response.email, response.username, this.convertSsoRoles(response.roles)[1]);
	}

	public convertSsoRoles(roles: string[]): UserRole[] {
		return roles.map((role) => {
			switch (role.toLowerCase()) {
				case "student":
					return UserRole.Tenant;
				case "faculty":
					return UserRole.Admin;
				case "admin":
					return UserRole.Admin;
				default:
					return UserRole.Tenant;
			}
		});
	}

	public getLoginUrl(): string {
		if (!this.config.authUrl) {
			throw new ValidationError("Auth URL not configured");
		}
		return this.config.authUrl;
	}

	private handleError(_error: unknown): never {
		throw new UnauthorizedError("Invalid SSO credentials");
	}
}
