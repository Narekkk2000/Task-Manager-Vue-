

export interface User {
    id: number,
    google_id: string | null
    avatar: string | null
    name: string,
    surname: string,
    birth_date: string,
    address: string,
    email: string,
    latitude: any;
    longitude: any;
    role: 'admin' | 'user'
}

export interface ProfileUser extends User{
    created_at: string,
    updated_at: string,
    email_verified_at: string|null,
}

export interface LogoutResponse {
    message: string;
}

type ResetPasswordErrors = {
    new_password: string[],
}

export interface ResetPasswordResponse {
    errors?: ResetPasswordErrors;
    message: string;
}


export type AuthResponse = ProfileUser;