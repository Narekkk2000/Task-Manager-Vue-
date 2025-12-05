<script setup lang="ts">
import {onMounted } from 'vue';
import { useTasks } from '@/composables/useTasks';

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import TaskForm from "@/components/tasks/taskForm/TaskForm.vue";
import Select from "@/components/base/form/Select.vue";
import BaseInput from "@/components/base/form/BaseInput.vue";
import TaskList from "@/components/tasks/taskList/TaskList.vue";
import TasksPlaceholder from "@/components/tasks/TasksPlaceholder.vue";

const { tasks, searchQuery, searchMode } = useTasks();

const selectOptions = [
  { id: "title", name: "By Title" },
  { id: "description", name: "By Description" }
];
</script>

<template>
  <FlexContainer  direction="column" class="text-center w-[90%] sm:w-[50%]"  :gap="50">
    <Heading as="h1"  color="black" v-once>My Tasks</Heading>
    <TaskForm/>
    <FlexContainer width="100" :gap="20">
      <Select
          class="!w-[40%]"
          v-model="searchMode"
          :options="selectOptions"
          placeholder="Search Mode"
      />

      <BaseInput
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
      />
    </FlexContainer>
    <TaskList :tasks="tasks" />
    <TasksPlaceholder v-show="!tasks.length"/>
  </FlexContainer>
</template>

