import w9 from "@/lib/sample/w9-no-issues.png"
import w2 from "@/lib/sample/w9-no-issues.png"

export const DOCUMENT_TYPES = [
    { id: "w2", label: "Form W2", sample: w2 },
    {
        id: "w9", label: "Form W9", sample: w9,
        rules: [
            {
                id: "1",
                field: "Name of entity/individual",
                text: "The name of the entity or individual is required."
            }
        ]
    },
    { id: "custom", label: "Create your Own", sample: null }
]