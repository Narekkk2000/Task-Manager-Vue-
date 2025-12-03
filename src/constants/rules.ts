import { REGEX } from "@/constants/validation";

interface PasswordRule {
    regex: RegExp;
    message: string;
}

export const PASSWORD_RULES:PasswordRule[] = [
    { regex: REGEX.password.uppercase, message: 'Password must contain at least 1 uppercase character' },
    { regex: REGEX.password.lowercase, message: 'Password must contain at least 1 lowercase character' },
    { regex: REGEX.password.number, message: 'Password must contain at least 1 number' },
    { regex: REGEX.password.specialChar, message: 'Password must contain at least 1 special character' },
] as const;