import {RegisterFormData, LoginFormData, ResetPasswordFormData} from "../interfaces/auth";
import {AuthResponse, LogoutResponse, ResetPasswordResponse} from "../interfaces/AuthResponse";

const API_URL = import.meta.env.VITE_API_URL;

export const getCsrfTokenFromCookie = ():string|null => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
        return decodeURIComponent(match[1]);
    }
    return null;
}

export const buildHeaders = (csrfToken: string | null):HeadersInit => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        'Accept': 'application/json',
    };
    if (csrfToken) {
        headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return headers;
}

export const register =  async (formData:RegisterFormData):Promise<AuthResponse> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response =  await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: buildHeaders(csrfToken),
        body: JSON.stringify(formData),
        credentials: 'include'
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}

export const login = async (formData:LoginFormData):Promise<AuthResponse> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: buildHeaders(csrfToken),
        body: JSON.stringify(formData)
    })
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}

export const logout = async ():Promise<LogoutResponse> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: buildHeaders(csrfToken),
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
};

export const resetPassword = async (formData:ResetPasswordFormData): Promise<ResetPasswordResponse> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: buildHeaders(csrfToken),
        body: JSON.stringify(formData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.log('Validation errors:', errorData);
        throw new Error(errorData.message || response.statusText);
    }
    return await response.json();
};



