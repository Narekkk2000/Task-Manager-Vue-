import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Task } from "../src/api/tasks";

const STORAGE_KEY = 'guestTasks';

const load = (): Task[] => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[];
    } catch {
        return [];
    }
};

export const useGuestTaskStore = defineStore('guestTasks', () => {
    const guestTasks = ref<Task[]>(load());

    const save = () => {
        try {
            if (!guestTasks.value.length) {
                localStorage.removeItem(STORAGE_KEY);
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(guestTasks.value));
            }
        } catch (err) {
            // optional: console.warn('save failed', err);
        }
    };

    const addTask = (task: Partial<Task>) => {
        const newTask: Task = {
            id: Date.now(),
            title: task.title || "",
            description: task.description || "",
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        guestTasks.value.unshift(newTask);
        save();
        return newTask;
    };

    const updateTask = (id: number, updated: Partial<Task>) => {
        let changed = false;
        guestTasks.value = guestTasks.value.map(t => {
            if (t.id === id) {
                changed = true;
                return { ...t, ...updated, updated_at: new Date().toISOString() };
            }
            return t;
        });
        if (changed) save();
    };

    const deleteTask = (id: number) => {
        const before = guestTasks.value.length;
        guestTasks.value = guestTasks.value.filter(t => t.id !== id);
        if (guestTasks.value.length !== before) save();
    };

    const clear = () => {
        guestTasks.value = [];
        save();
    };

    const markDone = (id: number) => {
        guestTasks.value = guestTasks.value.map(t =>
            t.id === id ? { ...t, status: 'done', updated_at: new Date().toISOString() } : t
        );
        save();
    };


    return { guestTasks, markDone, addTask, updateTask, deleteTask, clear };
});