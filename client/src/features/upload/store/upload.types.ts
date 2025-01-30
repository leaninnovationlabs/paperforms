export interface IValidateRequest {
  file: File;
  rules: string;
}

export interface IValidateResponse {
  response: Record<string, string>;
}
