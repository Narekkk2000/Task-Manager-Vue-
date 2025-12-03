<script setup lang="ts">
import type { CSSProperties } from "vue";
import ErrorMessage from "@/components/base/ui/text/ErrorMessage.vue";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";

interface BaseInputProps {
  modelValue: string | number |  Date | File |  null,
  type: string,
  id?: string,
  error?: string | null,
  label?: string,
  placeholder?: string,
  isTextArea?: boolean,
  style?: CSSProperties
}
defineProps<BaseInputProps>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number | Date | File | null): void
}>();

const onChange = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.type === 'file') {
    emits('update:modelValue', input.files?.[0] || null);
  } else {
    emits('update:modelValue', input.value);
  }
}

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  if (input.type !== 'file') {
    emits('update:modelValue', input.value);
  }
}
</script>

<template>
  <FlexContainer direction="column" :gap="5" :style="style">
    <textarea
        v-if="isTextArea"
        class="
        w-full font-oswald md:!text-sm lg:!text-lg !font-semibold
      !text-black !bg-white !py-2 !px-3
        !border-1 !border-gray-300 !rounded-lg !outline-none !transition-[padding] !duration-200 focus:!px-5 focus:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
      "
        :id="id"
        :placeholder="placeholder"
        :value="modelValue as string"
        @input="onInput"
        @change="onChange"
    />
    <input
        v-else
        class="
          w-full font-oswald !text-sm md:!text-base lg:!text-lg !font-semibold
        !text-black !bg-white !py-2 !px-3
          !border-1 !border-gray-300 !rounded-lg !outline-none !transition-[padding] !duration-200 focus:!px-5 focus:shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="type === 'file' ? undefined : modelValue"
        autocomplete="on"
        @input="onInput"
        @change="onChange"
    />
    <ErrorMessage v-if="error" :message="error"/>
  </FlexContainer>
</template>