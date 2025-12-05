<script setup lang="ts">
import {onMounted } from 'vue';
import { useTasks } from '@/composables/useTasks';

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import TaskForm from "@/components/tasks/taskForm/TaskForm.vue";
import TaskList from "@/components/tasks/taskList/TaskList.vue";
import TasksPlaceholder from "@/components/tasks/TasksPlaceholder.vue";

const { tasks } = useTasks();
</script>

<template>
  <FlexContainer  direction="column" class="text-center w-[90%] sm:w-[50%]"  :gap="50">
    <Heading as="h1"  color="black" v-once>My Tasks</Heading>
    <TaskForm/>
    <TaskList/>
    <TasksPlaceholder v-show="!tasks.length"/>
  </FlexContainer>
</template>

