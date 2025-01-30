export interface IValidateRequest {
  file: File;
  rules: string;
}

export type IValidationRequirement = Record<string, string>;
export type IValidationRequirements = Array<IValidationRequirement>;
export interface IValidateResponse {
  response: Array<IValidationRequirement>;
}
