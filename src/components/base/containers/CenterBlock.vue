<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isHome = computed(() => route.path === '/')
</script>

<template>
  <div
      :class="[
      isHome ? '!w-full' : '!w-[88%]',
      '!m-auto min-h-[calc(100vh-90px)] box-border flex justify-center !pb-6'
    ]"
  >
    <slot></slot>
  </div>
</template>
