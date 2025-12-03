<script setup lang="ts">
defineProps<{
  bold?: boolean,
  minH?: string,
  size?: 'sm' | 'lg',
  bottom?: string,
  color?: string,
  tooltip?: string
}>()
</script>

<template>
  <div class="relative group w-fit">
    <p :class="[
    'font-oswald !line-clamp-1 ',
    bold ? '!font-bold' : 'font-normal',
    size === 'sm' ? '!text-base' : size === 'lg' ? '!text-2xl xl:!text-3xl' : '!text-xl xl:!text-2xl',
    bottom === '2' ? '!mb-2' : bottom === '4' ? '!mb-4' : '',
    color === 'white' ? '!text-white' : '!text-black'
  ]"
       :style="{ minHeight: minH ? `${minH}px` : 'auto' }"
    >
      <slot></slot>
    </p>
    <span
        v-if="tooltip"
        class="font-oswald absolute bottom-full left-0 mb-2 hidden group-hover:block
             bg-black text-white text-xl !px-2 !py-1 rounded shadow-lg z-10 whitespace-nowrap"
    >
      {{ tooltip }}
    </span>
  </div>

</template>
