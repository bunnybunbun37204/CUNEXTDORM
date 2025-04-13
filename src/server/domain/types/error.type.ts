export class AppError extends Error {
	public readonly code: string;
	public readonly statusCode: number;

	constructor(message: string, code = "APP_ERROR", statusCode = 400) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string, id?: string) {
		super(`${resource} not found${id ? ` with ID ${id}` : ""}`, "NOT_FOUND", 404);
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, "CONFLICT", 409);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, "UNPROCESSABLE_CONTENT", 422);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, "UNAUTHORIZED", 401);
	}
}
