import w9 from "@/lib/sample/w9-date-issue.png"
import w2 from "@/lib/sample/w9-date-issue.png"

export const DOCUMENT_TYPES = [
    {
        id: "w2", label: "Form W2", sample: w2,
        defaultRules: "The name of the individual is required. Address is required. Either a social security number or an employer identification number must be present. Signature is required. Date is required.",
        defaultFields: "- Name of individual \n- Address \n- Social security number \n- Signature \n- Date"
    },
    {
        id: "w9", label: "Form W9", sample: w9,
        defaultRules: "The name of the individual is required. Address is required. Either a social security number or an employer identification number must be present. Signature is required. Date is required.",
        defaultFields: "- Name of individual \n- Address \n- Social security number \n- Signature \n- Date"
    },
    {
        id: "custom", label: "Create your Own", sample: null,
        defaultRules: "",
        defaultFields: ""
    }
]