const API_URL = import.meta.env.VITE_API_URL;
import { ProfileUser } from "../interfaces/AuthResponse";
import {getCsrfTokenFromCookie} from "@/api/auth";
import {buildHeaders} from "@/api/auth";


export const fetchProfile = async ():Promise<ProfileUser> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: buildHeaders(csrfToken)
    });
    if (!response.ok) throw new Error('Unauthorized or failed request');
    return await response.json();
};
