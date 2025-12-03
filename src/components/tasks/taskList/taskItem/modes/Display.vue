<script setup lang="ts">
import Text from "@/components/base/ui/text/Text.vue";
import {Task} from "@/api/tasks";

defineProps<{
  task: Task
}>();

</script>

<template>
  <div>
    <p
        class="font-oswald text-4xl"
        :class="task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800 font-semibold'"
    >
      {{ task.title }}
    </p>
    <Text>{{ task.description }}</Text>
  </div>
</template>
