<script setup lang="ts">
import { ref } from "vue";
import { useTasks } from "@/composables/useTasks";
import {useUserMessageStore} from "../../../../../stores/userMessage/userMessage";
import { Task } from "@/api/tasks";

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
import Display from "@/components/tasks/taskList/taskItem/modes/Display.vue";
import Editing from "@/components/tasks/taskList/taskItem/modes/Editing.vue";


const props = defineProps<{
  task: Task
}>()

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);

const userMessageStore = useUserMessageStore()

const { markDone, updateTask, deleteTask } = useTasks();

const handleUpdate = async () => {
  await updateTask(props.task.id, {
    title: editedTitle.value,
    description: editedDescription.value,
  });
  isEditing.value = false;
  userMessageStore.openMessage(`Task has been updated to ${editedTitle.value}`);
};
</script>

<template>
  <div class="!w-full !p-4 shadow-xl rounded-2xl bg-white">
    <FlexContainer  justify="between">
      <FlexContainer direction="column">
        <Display v-if="!isEditing" :task="task"/>
        <Editing
            v-else
            :title="editedTitle"
            :description="editedDescription"
            @update:title="editedTitle = $event"
            @update:description="editedDescription = $event"
        />
      </FlexContainer>

      <FlexContainer :gap="10">
        <BaseButton
            v-if="task.status !== 'done' && !isEditing"
            @action="markDone(task.id)"
            variant="forth"
            text="Done"
        />

        <BaseButton
            v-if="!isEditing"
            @action="isEditing = true"
            variant="fifth"
            text="Edit"
        />
        <BaseButton
            v-else
            @action="handleUpdate"
            variant="forth"
            text="Save"
        />

        <BaseButton
            v-if="isEditing"
            @action="() => { isEditing = false; editedTitle = task.title; editedDescription = task.description }"
            variant="third"
            text="Cancel"
        />

        <BaseButton
            v-if="!isEditing"
            @action="deleteTask(task.id)"
            variant="third"
            text="Delete"
        />
      </FlexContainer>
    </FlexContainer>
  </div>
</template>
