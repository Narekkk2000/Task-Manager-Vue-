<script setup lang="ts">
import { useTasks } from "@/composables/useTasks";

import BaseButton from "@/components/base/ui/BaseButton.vue";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";

defineProps<{
  modelValue: 'all' | 'pending' | 'done'
}>();

const emit = defineEmits<{
  'update:modelValue': [value: 'all' | 'pending' | 'done']
}>();
</script>

<template>
  <FlexContainer :gap="20" class="mt-4">
    <BaseButton
        :variant="modelValue === 'all' ? 'fifth' : 'forth'"
        text="All"
        @action="emit('update:modelValue', 'all')"
    />

    <BaseButton
        :variant="modelValue === 'pending' ? 'fifth' : 'forth'"
        text="Pending"
        @action="emit('update:modelValue', 'pending')"
    />

    <BaseButton
        :variant="modelValue === 'done' ? 'fifth' : 'forth'"
        text="Completed"
        @action="emit('update:modelValue', 'done')"
    />
  </FlexContainer>
</template>