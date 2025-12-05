import { defineStore } from 'pinia';
import { ref } from 'vue';
import {useGuestTaskStore} from "./guestTasks";
import { handleFetchTasks, handleCreateTask, handleUpdateTask, handleDeleteTask } from '@/api/tasks';
import { Task } from '@/api/tasks';

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([]);
    const mergedOnce = ref<boolean>(false);
    const guestStore = useGuestTaskStore();

    const fetchTasks = async () => {
        const res = await handleFetchTasks();
        tasks.value.splice(0, tasks.value.length, ...res);
    };

    const mergeGuestTasksIntoDB = async () => {
        if (mergedOnce.value) return; // prevents duplicates
        mergedOnce.value = true;

        if (!guestStore.guestTasks.length) return;

        for (const task of guestStore.guestTasks) {
            await handleCreateTask({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        }

        guestStore.clear();
        await fetchTasks();
    };

    const initTasks = async (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
            tasks.value = guestStore.guestTasks;
            return;
        }


        await mergeGuestTasksIntoDB();

        const res = await handleFetchTasks();
        tasks.value.splice(0, tasks.value.length, ...res);
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

    return { tasks, fetchTasks, initTasks, createTask, updateTask, deleteTask, clearTasks, markDone };
});
