<script setup lang="ts">
import {onMounted } from 'vue';
import { useTasks } from '@/composables/useTasks';

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import TaskForm from "@/components/tasks/taskForm/TaskForm.vue";
import TaskList from "@/components/tasks/taskList/TaskList.vue";

const { tasks, fetchTasks, createTask, markDone, deleteTask } = useTasks();


onMounted(() => fetchTasks());
</script>

<template>
  <FlexContainer direction="column" :gap="50">
    <Heading as="h1" color="black">My Tasks</Heading>

    <TaskForm/>
    <TaskList/>


    <div v-if="tasks.length === 0" class="text-gray-500 text-center mt-6">
      No tasks yet. Add your first task above!
    </div>
  </FlexContainer>
</template>

<style scoped>
/* Optional: subtle shadow for better UI */
</style>

