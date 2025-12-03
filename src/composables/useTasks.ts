import { computed } from 'vue';
import { useTaskStore } from '../../stores/taskStore';

export const useTasks = () => {
    const store = useTaskStore();

    return {
        tasks: computed(() => store.tasks),
        fetchTasks: store.fetchTasks,
        createTask: store.createTask,
        updateTask: store.updateTask,
        deleteTask: store.deleteTask,
        markDone: store.markDone,
    };
};
