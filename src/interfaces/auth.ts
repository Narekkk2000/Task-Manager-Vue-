export interface RegisterFormData {
    name: string;
    surname: string;
    email: string;
    birth_date: string;
    address: string;
    password: string;
}

export interface RegisterFormErrors {
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    birth_date?: string | null;
    address?: string | null;
    password?: string | null;
}

export interface LoginFormData {
    email: string | null;
    password: string | null;
}

export interface ResetPasswordFormData {
    password: string | null;
    new_password: string | null;
    new_password_confirmation: string | null;
}

export interface LoginFormErrors {
    email?: string | null;
    password?: string | null;
}