<script setup lang="ts">
interface FlexContainerProps {
  as?: string;
  direction?: 'row' | 'column';
  justify?: string;
  align?: string;
  gap?: number;
  width?: string;
  height?: string;
  padding?: string;
  bg?: string;
  radius?: string;
  boxShadow?: string;
}

withDefaults(defineProps<FlexContainerProps>(), {
  as: 'div',
  direction: 'row',
  justify: 'center',
  gap: 0
});

defineEmits<{
  (e: 'submit', event: Event): void
}>();
</script>
<template>
  <component
      :is="as"
      @submit.prevent="$emit('submit', $event)"
      :class="[
      'flex flex-wrap',
      direction === 'column' ? 'flex-col' : 'flex-row',
      justify && `justify-${justify}`,
      align ? `items-${align}` :  `items-center`
      ]"
      :style="
      {
        gap: gap + 'px',
        width: width + '%',
        height: height + '%',
        padding: padding,
        backgroundColor: bg,
        borderRadius: radius + 'px',
        boxShadow: boxShadow,
      }
">
    <slot></slot>
  </component>
</template>