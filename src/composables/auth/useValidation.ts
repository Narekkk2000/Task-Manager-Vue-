import {ref} from 'vue';
import {
    validateName,
    validateSurname,
    validateBirthDate,
    validateAddress,
    validateEmail,
    validatePassword
} from "@/utils/InputValidators";
import {RegisterFormData, LoginFormData, RegisterFormErrors, LoginFormErrors} from "../../interfaces/auth";

export const useValidation = () => {
    const errors = ref<RegisterFormErrors | LoginFormErrors>({});

    const validateRegister = (formData:RegisterFormData) =>  {
        const {name, surname, birth_date, address, email, password} = formData;
        errors.value = {
            name: validateName(name),
            surname: validateSurname(surname),
            birth_date: validateBirthDate(birth_date),
            address: validateAddress(address),
            email: validateEmail(email),
            password: validatePassword(password),
        }
        return Object.values(errors.value).every(error => !error);
    }

    const validateLogin = (formData:LoginFormData) =>  {
        const {email, password} = formData;
        errors.value = {
            email: validateEmail(email),
            password: validatePassword(password),
        }
        return Object.values(errors.value).every(error => !error);
    }

    const setServerErrors = (serverErrors: Record<string, string[]>) => {
        errors.value = { ...errors.value };
        for (const [field, messages] of Object.entries(serverErrors)) {
            const fieldMap: Record<string, string> = {
                'email': 'email',
                'password': 'password',
            };

            const mappedField = fieldMap[field] || field;

            if (mappedField in errors.value) {
                errors.value[mappedField as keyof typeof errors.value] = messages[0];
            }
        }
    }

    const clearErrors = () => {
        errors.value = {};
    }
    return {
        errors,
        validateRegister,
        validateLogin,
        setServerErrors,
        clearErrors,
    } as const;
}