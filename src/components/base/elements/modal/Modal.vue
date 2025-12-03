<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const handleBackdropClick = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop with instant blur -->
    <Transition
        enter-active-class="transition-all duration-150"
        leave-active-class="transition-all duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
      <div
          v-if="isOpen"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          @click="handleBackdropClick"
      ></div>
    </Transition>

    <!-- Modal content with fancy animation -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 scale-75 "
        enter-to-class="opacity-100 scale-100 "
        leave-from-class="opacity-100 scale-100 "
        leave-to-class="opacity-0 scale-90 "
    >
      <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        <div
            id="modal-wrapper"
            class="relative z-10 !bg-transparent rounded-xl shadow-2xl pointer-events-auto"
            @click.stop
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>