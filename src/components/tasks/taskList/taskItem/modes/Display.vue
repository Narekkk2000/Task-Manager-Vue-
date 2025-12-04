<script setup lang="ts">
import Text from "@/components/base/ui/text/Text.vue";
import {Task} from "@/api/tasks";

defineProps<{
  task: Task
}>();

</script>

<template>
  <div>
    <Text
        :class="task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800 font-semibold'"
        size="lg"
    >
      {{ task.title }}
    </Text>
    <Text
        class="max-w-79.5"
        :tooltip="task.description"
    >
      {{ task.description }}
    </Text>
  </div>
</template>
