import { ErrorType, ErrorValidation, ErrorResponse } from "./types";

interface Errors {
  code: number;
  message: string;
}

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;
  private errors: Errors | null;
  private errorRaw: any;
  private errorsValidation: ErrorValidation[] | null;

  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string,
    errors: Errors | null = null,
    errorRaw: any = null,
    errorsValidation: ErrorValidation[] | null = null
  ) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
    this.errors = errors;
    this.errorRaw = errorRaw;
    this.errorsValidation = errorsValidation;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errors: this.errors,
      errorRaw: this.errorRaw,
      errorsValidation: this.errorsValidation,
      stack: this.stack,
    };
  }
}
