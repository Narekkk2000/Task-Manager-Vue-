enum FormFieldName {
    NAME = 'name',
    SURNAME = 'surname',
    BIRTH_DATE = 'birth_date',
    ADDRESS = 'address',
    EMAIL = 'email',
    PASSWORD = 'password'
}

interface FormField {
    id: FormFieldName;
    type: 'text' | 'email' | 'date' |  'password' | 'number';
    label: string;
    placeholder: string;
}

export const FORM_FIELDS: Record<FormFieldName, FormField> = {
    [FormFieldName.NAME]: {
        id: FormFieldName.NAME,
        type: 'text',
        label: "What's your name",
        placeholder: "Name"
    },
    [FormFieldName.SURNAME]: {
        id: FormFieldName.SURNAME,
        type: 'text',
        label: "What's your surname",
        placeholder: "Surname"
    },
    [FormFieldName.BIRTH_DATE]: {
        id: FormFieldName.BIRTH_DATE,
        type: 'date',
        label: "What's your birth date",
        placeholder: "Birth date",
    },
    [FormFieldName.ADDRESS]: {
        id: FormFieldName.ADDRESS,
        type: 'text',
        label: "What's your address",
        placeholder: "Address",
    },
    [FormFieldName.EMAIL]: {
        id: FormFieldName.EMAIL,
        type: 'email',
        label: "What's your email",
        placeholder: "Email",
    },
    [FormFieldName.PASSWORD]: {
        id: FormFieldName.PASSWORD,
        type: 'password',
        label: "What's your password",
        placeholder: "Password",
    }
} as const;
