import {getCsrfTokenFromCookie, buildHeaders} from "@/api/auth";
const API_URL = import.meta.env.VITE_API_URL;

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'done';
    created_at: string;
    updated_at: string;
}

export const handleFetchTasks = async (): Promise<Task[]> => {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        credentials: "include",
        headers: buildHeaders(csrfToken),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
};

export const handleCreateTask = async (data: Partial<Task>)=> {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: buildHeaders(csrfToken),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
};

export const handleUpdateTask = async (id: number, data: Partial<Task>)=> {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: buildHeaders(csrfToken),
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
};

export const handleDeleteTask = async (id: number,)=> {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: "include",
    });
    const csrfToken = getCsrfTokenFromCookie();
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: buildHeaders(csrfToken),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
};



