interface Errors {
  code: number;
  message: string;
}

export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: Errors | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};

export type ErrorType = "General" | "Raw" | "Validation" | "Unauthorized";

export type ErrorValidation = { [key: string]: string };
