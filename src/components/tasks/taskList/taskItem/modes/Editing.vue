<script setup lang="ts">
import BaseInput from "@/components/base/form/BaseInput.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  title: string,
  description?: string
}>();

const emit = defineEmits<{
  (e: "update:title", value: string): void,
  (e: "update:description", value: string): void
}>();


const localTitle = ref(props.title ?? '');
const localDescription = ref(props.description ?? '');


watch(localTitle, (val) => emit("update:title", val));
watch(localDescription, (val) => emit("update:description", val));
</script>

<template>
  <div class="flex flex-col gap-2">
    <BaseInput
        v-model="localTitle"
        type="text"
        class="w-full border border-gray-300 rounded p-2 font-oswald text-lg focus:ring-2 focus:ring-purple-500 outline-none"
        placeholder="Title"
    />

    <textarea
        v-model="localDescription"
        rows="3"
        class="
          w-full !p-3 font-oswald !text-base font-semibold
          !text-black bg-white !border !border-gray-300 !rounded-lg outline-none
          transition-[padding] duration-200
          focus:px-5 focus:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
          resize-y
        "
        placeholder="Description"
    ></textarea>
  </div>
</template>
