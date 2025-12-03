<script setup lang="ts">
import { ref } from 'vue';
import { useTasks } from '@/composables/useTasks';
import {useUserMessageStore} from "../../../../stores/userMessage/userMessage";



import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
import BaseInput from "@/components/base/form/BaseInput.vue";
import UserMessage from "@/components/base/ui/UserMessage.vue";



const newTaskTitle = ref('');
const newTaskDescription = ref('');

const userMessageStore = useUserMessageStore();
const { createTask } = useTasks();

const handleCreate = async () => {
  if (!newTaskTitle.value.trim()) return;
  await createTask({
    title: newTaskTitle.value,
    description: newTaskDescription.value,
  });

  userMessageStore.openMessage(`${newTaskTitle.value} Task Added`)

  newTaskTitle.value = '';
  newTaskDescription.value = '';

};
</script>

<template>
  <!-- Create Task Form -->
  <FlexContainer direction="column" :gap="20">
    <Heading as="h3" color="black">Create New Task</Heading>

    <BaseInput
        v-model="newTaskTitle"
        type="text"
        placeholder="Task title"
    />

    <textarea
        v-model="newTaskDescription"
        placeholder="Task description (optional)"
        class="
    w-full !p-3 font-oswald md:!text-sm lg:!text-lg !font-semibold
    !text-black !bg-white py-2 px-3
    !border !border-gray-300 !rounded-lg outline-none transition-[padding] duration-200
    focus:px-5 focus:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
    resize-y
  "
    ></textarea>

    <BaseButton
        @action="handleCreate"
        text="Create"
        variant="forth"
    />
    <UserMessage :show="userMessageStore.showSuccessMessage" :message="userMessageStore.message" />
  </FlexContainer>
</template>