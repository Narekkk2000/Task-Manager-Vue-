<script setup lang="ts">
import {useTasks} from "@/composables/useTasks";
import {Task} from "@/api/tasks";
import {useUserMessageStore} from "../../../../stores/userMessage/userMessage";

import TaskItem from "@/components/tasks/taskList/taskItem/TaskItem.vue";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import UserMessage from "@/components/base/ui/UserMessage.vue";

defineProps<{
  tasks: Task[]
}>();
const userMessageStore = useUserMessageStore()
</script>

<template>
  <FlexContainer width="100" direction="column" :gap="30">
    <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
    />
    <UserMessage :show="userMessageStore.showSuccessMessage" :message="userMessageStore.message" />
  </FlexContainer>


</template>