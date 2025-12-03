<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  show: boolean;
  message?: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Success!',
  duration: 2500
});

const emit = defineEmits<{
  close: []
}>();

const isVisible = ref(false);

watch(() => props.show, (newVal) => {
  if (newVal) {
    isVisible.value = true;

    setTimeout(() => {
      isVisible.value = false;
      setTimeout(() => emit('close'), 300);
    }, props.duration);
  }
});
</script>

<template>
  <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
  >
    <div
        v-show="isVisible"
        class="font-oswald fixed top-25 right-5 !bg-[#DD5C36] text-white !px-6 !py-4 rounded flex items-center gap-3 shadow-2xl z-[9999] min-w-[280px]"
    >
      <Icon icon="mdi:success-bold" class="w-7 h-7 text-white"/>
      <span class="text-xl font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>