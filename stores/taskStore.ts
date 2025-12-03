import { defineStore } from 'pinia';
import { ref } from 'vue';
import { handleFetchTasks, handleCreateTask, handleUpdateTask, handleDeleteTask } from '@/api/tasks';
import { Task } from '@/api/tasks';
const API_URL = import.meta.env.VITE_API_URL;


`${API_URL}/sanctum/csrf-cookie`

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([]);

    const fetchTasks = async () => {
        const res = await handleFetchTasks();
        tasks.value = res;
    };

    const createTask = async (data: Partial<Task>) => {
        const newTask = await handleCreateTask(data);

        tasks.value = [newTask, ...tasks.value];
    };

    const updateTask = async (id: number, data: Partial<Task>) => {
        const updated = await handleUpdateTask(id, data);

        tasks.value = tasks.value.map(task =>
            task.id === id ? updated : task
        );
    };


    const deleteTask = async (id: number) => {
        await handleDeleteTask(id)

        tasks.value = tasks.value.filter(t => t.id !== id);
    };

    const clearTasks = () => {
        tasks.value = [];
    }

    const markDone = (id: number) => updateTask(id, { status: 'done' });

    return { tasks, fetchTasks, createTask, updateTask, deleteTask, clearTasks, markDone };
});
