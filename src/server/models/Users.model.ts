import type { User as UserProps, UserRole } from "@prisma/client";

export class User extends Model<UserProps> {
	get role(): UserRole {
		return this.props.role;
	}

	verifyStudent(universityId: string) {
		this.props.universityId = universityId;
		this.props.verifiedStudent = true;
	}
}
