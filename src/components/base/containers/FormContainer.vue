<script setup lang="ts">
import FlexContainer from "@/components/base/containers/FlexContainer.vue";

defineEmits<{
  (e: 'submit', event: Event): void
}>();
</script>

<template>

  <FlexContainer
      @submit="$emit('submit', $event)"
      as="form"
      width="100"
      padding="20px 36px"
      bg="white"
      direction="column"
      :gap="50"
      radius="12"
  >
    <slot></slot>
  </FlexContainer>

</template>