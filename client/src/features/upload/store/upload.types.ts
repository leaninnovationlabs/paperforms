export interface IValidateRequest {
  file: File;
  rules: string;
}

export type IDocumentType = "W9" | "W2";

export type IValidationRequirement = Record<string, string>;
export type IValidationRequirements = Array<IValidationRequirement>;

export interface ICleanupResponse {
  response: string;
}
export interface IValidateResponse {
  response: Array<IValidationRequirement>;
}
