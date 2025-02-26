from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional

class DocumentType(str, Enum):
    W9 = "W9"
    W2 = "W2"

# --- W2 Parsing ---
class EmployerInfo(BaseModel):
    name: Optional[str] = Field(None, description="Employer's name")
    ein: Optional[str] = Field(None, description="Employer Identification Number (EIN)")
    address: Optional[str] = Field(None, description="Employer's full address including City, State, and ZIP Code")
class EmployeeInfo(BaseModel):
    name: Optional[str] = Field(None, description="Employee's full name")
    ssn: Optional[str] = Field(None, description="Masked Social Security Number (e.g., XXX-XX-1234)")
    address: Optional[str] = Field(None, description="Employee's full address including City, State, and ZIP Code")
    signature: Optional[bool] = Field(None, description="True if employee's signature is present, False otherwise")
    signing_date: Optional[str] = Field(None, description="Date the employee signed the document (if available)")
class WagesAndTaxes(BaseModel):
    wages_tips_other: Optional[str] = Field(None, description="Wages, tips, and other compensation (Box 1)")
    federal_income_tax: Optional[str] = Field(None, description="Federal income tax withheld (Box 2)")
    social_security_wages: Optional[str] = Field(None, description="Social Security wages (Box 3)")
    social_security_tax: Optional[str] = Field(None, description="Social Security tax withheld (Box 4)")
    medicare_wages: Optional[str] = Field(None, description="Medicare wages (Box 5)")
    medicare_tax: Optional[str] = Field(None, description="Medicare tax withheld (Box 6)")
    state_wages_tips: Optional[str] = Field(None, description="State wages, tips (Box 16)")
    state_income_tax: Optional[str] = Field(None, description="State income tax withheld (Box 17)")
class AdditionalInfo(BaseModel):
    control_number: Optional[str] = Field(None, description="Control number (if available)")
    state: Optional[str] = Field(None, description="State abbreviation (Box 15)")
    employer_state_id: Optional[str] = Field(None, description="Employer's State ID Number (Box 15)")
class W2ExtractionResult(BaseModel):
    employer_info: Optional[EmployerInfo] = None
    employee_info: Optional[EmployeeInfo] = None
    wages_and_taxes: Optional[WagesAndTaxes] = None
    additional_info: Optional[AdditionalInfo] = None

# --- W9 Parsing ---
class EntityInfo(BaseModel):
    name: Optional[str] = Field(None, description="Full name of the entity or individual")
    business_name: Optional[str] = Field(None, description="Business name if different from entity name")
    address: Optional[str] = Field(None, description="Street address including Apartment or Suite number")
    city_state_zip: Optional[str] = Field(None, description="City, State, and ZIP Code")
    ssn: Optional[str] = Field(None, description="Masked Social Security Number (e.g., XXX-XX-1234)")
    ein: Optional[str] = Field(None, description="Employer Identification Number (EIN) if provided")
    signature: Optional[bool] = Field(None, description="True if a signature is detected, otherwise False")
    signing_date: Optional[str] = Field(None, description="Date the form was signed")
class TaxClassification(BaseModel):
    federal_tax_classification: Optional[str] = Field(None, description="Federal tax classification (e.g., Individual, Corporation, Partnership)")
    exempt_payee_code: Optional[str] = Field(None, description="Exempt payee code if applicable")
    fatca_exemption_code: Optional[str] = Field(None, description="Exemption from FATCA reporting code if applicable")
class AdditionalInfo(BaseModel):
    requester_name_address: Optional[str] = Field(None, description="Requester’s name and address if provided")
    account_numbers: Optional[str] = Field(None, description="Account numbers if listed")
class W9ExtractionResult(BaseModel):
    entity_info: Optional[EntityInfo] = None
    tax_classification: Optional[TaxClassification] = None
    additional_info: Optional[AdditionalInfo] = None