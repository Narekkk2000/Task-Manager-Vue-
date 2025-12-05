import { onMounted, watch, computed } from 'vue';
import {useTaskStore} from "../../stores/taskStore";
import {useGuestTaskStore} from "../../stores/guestTasks";
import {useUserStore} from "../../stores/user";
import {Task} from "@/api/tasks";

export const useTasks = () => {
    const taskStore = useTaskStore();
    const guestStore = useGuestTaskStore();
    const authStore = useUserStore();

    const init = async () => {
        if (authStore.user) {
            await taskStore.initTasks(true);
        } else {
            taskStore.tasks.splice(0, taskStore.tasks.length, ...guestStore.guestTasks);
        }
    };

    onMounted(init);

    watch(
        () => authStore.user,
        async (user) => {
            if (user) {
                await taskStore.initTasks(true);
            } else {
                taskStore.tasks.splice(0, taskStore.tasks.length, ...guestStore.guestTasks);
            }
        }
    );

    const createTask = (task:Task) => {
        return authStore.user
            ? taskStore.createTask(task)
            : guestStore.addTask(task);
    };

    const updateTask = (id:number, task:Task) => {
        return authStore.user
            ? taskStore.updateTask(id, task)
            : guestStore.updateTask(id, task);
    };

    const deleteTask = (id:number) => {
        return authStore.user
            ? taskStore.deleteTask(id)
            : guestStore.deleteTask(id);
    };

    const markDone = (id: number) => {
        return authStore.user
            ? taskStore.markDone(id)
            : guestStore.markDone(id);
    };

    return {
        tasks: computed(() =>
            authStore.user ? taskStore.tasks : guestStore.guestTasks
        ),
        markDone,
        createTask,
        updateTask,
        deleteTask,
    };
};
