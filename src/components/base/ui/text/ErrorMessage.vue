<script setup lang="ts">
defineProps<{message:string}>()
</script>

<template>
  <p
      class="font-oswald w-full text-red-700 text-base  text-center !font-bold"
       v-show="message"
  >
    {{message}}
  </p>
</template>