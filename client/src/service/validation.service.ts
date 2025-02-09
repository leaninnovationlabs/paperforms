import {
  ICleanupResponse,
  IValidateResponse,
} from "../features/upload/store/upload.types";
import { ApiService } from "./api.service";

const cleanupTaxFormUrl = `http://localhost:8080/w9-validator/v1/ocr`;
const validateTaxFormUrl = `http://localhost:8080/w9-validator/v1/validator`;

class ValidationService extends ApiService {
  async cleanFields(body: FormData): Promise<ICleanupResponse> {
    return this.post(cleanupTaxFormUrl, body);
  }

  async validateTaxForm(body: FormData): Promise<IValidateResponse> {
    return this.post(validateTaxFormUrl, body);
  }
}

export default ValidationService;

