<script setup lang="ts">
import { ref } from "vue";
import { useTasks } from "@/composables/useTasks";
import {useUserMessageStore} from "../../../../../stores/userMessage/userMessage";
import { Task } from "@/api/tasks";

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
import Display from "@/components/tasks/taskList/taskItem/modes/Display.vue";
import Editing from "@/components/tasks/taskList/taskItem/modes/Editing.vue";
import { Icon } from "@iconify/vue";


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
  <div class="!w-full !p-4 shadow-xl rounded-2xl " :class="task.status === 'done' ? 'bg-green-50' : 'bg-white' ">
    <div  class="flex flex-col items-center sm:flex-row gap-4.5 sm:justify-between">
      <Icon
          v-if="!isEditing"
          icon="material-symbols:done"
          class="w-12 h-12 !p-2 !border-2 border-b-green-600  rounded-full shadow-sm cursor-pointer transition-colors duration-300"
          :class="[
              task.status === 'done' ? 'bg-green-600 text-white' : 'bg-white text-green-600',
          ]"
          @click="markDone(task.id)"
      />
      <Display v-if="!isEditing" :task="task"/>
      <Editing
            v-else
            :title="editedTitle"
            :description="editedDescription"
            @update:title="editedTitle = $event"
            @update:description="editedDescription = $event"
      />

      <FlexContainer :gap="10">
<!--        <BaseButton-->
<!--            v-if="task.status !== 'done' && !isEditing"-->
<!--            @action="markDone(task.id)"-->
<!--            variant="fifth"-->
<!--            text="Done"-->
<!--        />-->

        <BaseButton
            v-if="!isEditing"
            @action="isEditing = true"
            variant="forth"
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
    </div>
  </div>
</template>
