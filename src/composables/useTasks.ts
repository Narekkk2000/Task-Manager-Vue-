import { ref, onMounted, watch, computed } from 'vue';
import {useTaskStore} from "../../stores/taskStore";
import {useGuestTaskStore} from "../../stores/guestTasks";
import {useUserStore} from "../../stores/user";
import {Task} from "@/api/tasks";

export const useTasks = () => {
    const searchQuery = ref<string>("");
    const searchMode = ref<"title" | "description">("title");

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

    const createTask = (task: Partial<Task>) => {
        return authStore.user
            ? taskStore.createTask(task)
            : guestStore.addTask(task);
    };

    const updateTask = (id:number, task: Partial<Task>) => {
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

    const filteredTasks = computed(() => {
        const q = searchQuery.value.trim().toLowerCase();
        const items = authStore.user ? taskStore.tasks : guestStore.guestTasks;

        if (!q) return items;

        return items.filter(t => {
            const text =
                searchMode.value === "title"
                    ? t.title.toLowerCase()
                    : t.description.toLowerCase();

            // split into words: "Learn PHP" → ["learn", "php"]
            const words = text.split(/\s+/);

            // check if ANY word starts with the query
            return words.some(word => word.startsWith(q));
        });
    });



    return {
        // tasks: computed(() =>
        //     authStore.user ? taskStore.tasks : guestStore.guestTasks
        // ),
        tasks:filteredTasks,
        searchQuery,
        searchMode,
        markDone,
        createTask,
        updateTask,
        deleteTask,
    };
};
