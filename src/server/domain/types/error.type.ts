export class AppError extends Error {
	public readonly code: string;
	public readonly statusCode: number;

	constructor(message: string | undefined, code = "APP_ERROR", statusCode = 400) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

// 400
export class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, "BAD_REQUEST", 400);
	}
}

// 401
export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, "UNAUTHORIZED", 401);
	}
}

// 403
export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, "FORBIDDEN", 403);
	}
}

// 404
export class NotFoundError extends AppError {
	constructor(resource: string, id?: string) {
		super(`${resource} not found${id ? ` with ID ${id}` : ""}`, "NOT_FOUND", 404);
	}
}

// 405
export class MethodNotSupportedError extends AppError {
	constructor(message = "Method not supported") {
		super(message, "METHOD_NOT_SUPPORTED", 405);
	}
}

// 408
export class TimeoutError extends AppError {
	constructor(message = "Request timeout") {
		super(message, "TIMEOUT", 408);
	}
}

// 409
export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(message, "CONFLICT", 409);
	}
}

// 412
export class PreconditionFailedError extends AppError {
	constructor(message = "Precondition failed") {
		super(message, "PRECONDITION_FAILED", 412);
	}
}

// 413
export class PayloadTooLargeError extends AppError {
	constructor(message = "Payload too large") {
		super(message, "PAYLOAD_TOO_LARGE", 413);
	}
}

// 415
export class UnsupportedMediaTypeError extends AppError {
	constructor(message = "Unsupported media type") {
		super(message, "UNSUPPORTED_MEDIA_TYPE", 415);
	}
}

// 422
export class ValidationError extends AppError {
	constructor(message = "Validation error") {
		super(message, "UNPROCESSABLE_CONTENT", 422);
	}
}

// 429
export class TooManyRequestsError extends AppError {
	constructor(message = "Too many requests") {
		super(message, "TOO_MANY_REQUESTS", 429);
	}
}

// 499
export class ClientClosedRequestError extends AppError {
	constructor(message = "Client closed request") {
		super(message, "CLIENT_CLOSED_REQUEST", 499);
	}
}

// 500
export class InternalServerError extends AppError {
	constructor(message = "Internal server error") {
		super(message, "INTERNAL_SERVER_ERROR", 500);
	}
}

// 501
export class NotImplementedError extends AppError {
	constructor(message = "Not implemented") {
		super(message, "NOT_IMPLEMENTED", 501);
	}
}

// 502
export class BadGatewayError extends AppError {
	constructor(message = "Bad gateway") {
		super(message, "BAD_GATEWAY", 502);
	}
}

// 503
export class ServiceUnavailableError extends AppError {
	constructor(message = "Service unavailable") {
		super(message, "SERVICE_UNAVAILABLE", 503);
	}
}

// 504
export class GatewayTimeoutError extends AppError {
	constructor(message = "Gateway timeout") {
		super(message, "GATEWAY_TIMEOUT", 504);
	}
}
