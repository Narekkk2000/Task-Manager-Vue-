<script setup lang="ts">
import {computed} from "vue";

type ButtonVariant = "primary" | "secondary" | "third" | "forth" | "fifth" | "six";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  text: string;
  variant?: ButtonVariant;
  width?: string;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  active?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  active: false,
});

const emit = defineEmits<{
  (e: "action", event: MouseEvent): void;
}>();

const sizeClasses: Record<ButtonSize, string> = {
  sm: "sm:!text-xs md:!text-sm",
  md: "md:!text-base lg:!text-lg",
  lg: "sm:!text-base md:!text-lg lg:!text-xl",
};
const variantClasses: Record<ButtonVariant, (active: boolean) => string> = {
  primary: (active) =>
      [
        "font-oswald w-fit !font-bold !px-4 !py-1 !text-white !border-2 !border-transparent !rounded-lg",
        "transition duration-250 hover:!text-black",
        "hover:!border-white hover:!bg-white cursor-pointer",
        active && "bg-[#E6FD53] text-black border-[#E6FD53]",
      ]
          .filter(Boolean)
          .join(" "),

  secondary: () =>
      [
        "font-oswald w-fit !font-bold !px-4 !py-1 !text-black border-white rounded-xl",
        "!bg-transparent !rounded-lg transition duration-250 hover:shadow-white",
        "hover:!bg-black hover:!text-white cursor-pointer",
      ].join(" "),

  third: () =>
      [
        "font-oswald w-fit !font-bold !px-4 !py-1 !text-[#DD5C36] !rounded-lg",
        "!bg-[#ECCC7B]  transition duration-250 hover:shadow-white",
        "hover:!bg-[#DD5C36] hover:!text-[#ECCC7B] cursor-pointer",
      ].join(" "),

  forth: (active) =>
      [
        "font-oswald w-fit !font-bold !px-4 !py-1 !border-2 border-[#233d4d] !rounded-xl transition duration-250 cursor-pointer",
        active
            ? "!bg-[#333333] !text-white !border-[#333333]"
            : "!bg-white !text-[#333333] hover:!border-[#333333] hover:!bg-[#333333] hover:!text-white",
      ].join(" "),

  fifth: (active) =>
      [
        "font-oswald w-fit !font-bold !px-4 !py-1 !rounded-lg transition duration-250 cursor-pointer",
        active
            ? "!bg-[#204F56] !text-white !shadow-[0_0_10px_rgba(230,253,83,0.5)]"
            : "!bg-black !text-white",
      ].join(" "),
  six: (active) =>
      [
        "font-oswald w-fit !font-bold !px-5 !py-1 !rounded-lg transition duration-250 cursor-pointer",
        active
            ? "!bg-[#204F56] !text-white !shadow-[0_0_10px_rgba(230,253,83,0.5)]"
            : "!bg-[#D9E9CF] !text-[#506F50] hover:!bg-[#506F50] hover:!text-[#D9E9CF]",
      ].join(" "),
};

const buttonClasses = computed(() => [
  sizeClasses[props.size],
  variantClasses[props.variant](props.active),
  // props.width ? `!w-[${props.width}%]` : '!w-fit'
]);
</script>

<template>
  <button
      :type="props.type"
      :disabled="props.disabled"
      :class="buttonClasses"
      :style="props.width ? { width: props.width + '%' } : {}"
      @click="(e) => emit('action', e)"
  >
    {{ props.text }}
  </button>
</template>
