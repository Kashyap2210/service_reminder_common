export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly key?: string,
    public readonly errors?: any,
  ) {
    super(message);
    this.name = this.constructor.name;
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }

  getResponse() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      key: this.key,
      errors: this.errors,
    };
  }

  getStatus() {
    return this.statusCode;
  }
}

export class BadRequestException extends HttpException {
  constructor(
    input: { key: string; message: string } | string | string[],
    errors?: any,
  ) {
    if (typeof input === "object" && !Array.isArray(input)) {
      super(input.message, 400, input.key, errors);
    } else {
      super(
        Array.isArray(input) ? input.join(", ") : input,
        400,
        undefined,
        errors,
      );
    }
  }
}

export class NotFoundException extends HttpException {
  constructor(input: { key: string; message: string } | string = "Not Found") {
    if (typeof input === "object") {
      super(input.message, 404, input.key);
    } else {
      super(input, 404);
    }
  }
}

export class UnauthorizedException extends HttpException {
  constructor(
    input: { key: string; message: string } | string = "Unauthorized",
  ) {
    if (typeof input === "object") {
      super(input.message, 401, input.key);
    } else {
      super(input, 401);
    }
  }
}

export class ForbiddenException extends HttpException {
  constructor(input: { key: string; message: string } | string = "Forbidden") {
    if (typeof input === "object") {
      super(input.message, 403, input.key);
    } else {
      super(input, 403);
    }
  }
}
