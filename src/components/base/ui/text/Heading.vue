<script setup lang="ts">
import { computed, withDefaults, defineProps } from 'vue';

const props = withDefaults(defineProps<{
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  color?: string
}>(), {
  as: 'h3',
});

const sizeClass = computed(() => {
  const mapping: Record<string, string> = {
    h1: '!text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
    h2: '!text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    h3: '!text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    h4: '!text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    h5: '!text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    h6: '!text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  };
  return mapping[props.as || 'h3'];
});

const colorClass = computed(() => props.color ? `text-${props.color}` : 'text-white');
</script>

<template>
  <component
      :is="props.as"
      :class="['font-oswald font-bold', sizeClass, colorClass]"
  >
    <slot></slot>
  </component>
</template>
