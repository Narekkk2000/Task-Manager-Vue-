<script setup lang="ts">
import {useTasks} from "@/composables/useTasks";

import TaskItem from "@/components/tasks/taskList/taskItem/TaskItem.vue";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";

const { tasks } = useTasks();
</script>

<template>
  <FlexContainer direction="column" :gap="30">
    <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
    />
  </FlexContainer>


</template>