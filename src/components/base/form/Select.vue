<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseInput from "@/components/base/form/BaseInput.vue";

const props = defineProps<{
  modelValue: number | string | null;
  options: Array<{ id: string | number } & Record<string, unknown>>
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean; // Add searchable prop
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref<boolean>(false);
const searchQuery = ref<string>('');

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value && props.searchable) {
    setTimeout(() => {
      const input = document.querySelector('.search-input') as HTMLInputElement;
      input?.focus();
    }, 50);
  }
};

const selected = computed(() => {
  return props.options.find(opt => opt.id === props.modelValue);
});

const selectedText = computed(() => {
  return selected.value ? selected.value.name : props.placeholder;
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.options;
  }
  const query = searchQuery.value.toLowerCase();
  return props.options.filter(opt =>
      opt.name?.toString().toLowerCase().includes(query)
  );
});

const select = <T extends { id: string | number }>(option: T) => {
  if (props.disabled) return;
  emit('update:modelValue', option.id);
  isOpen.value = false;
  searchQuery.value = '';
}

const closeDropdown = () => {
  isOpen.value = false;
  searchQuery.value = '';
};

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target?.closest('.relative')) {
    closeDropdown();
  }
});
</script>

<template>
  <div class="relative w-full">
    <button
        type="button"
        class="w-full !mb-1 !text-black shadow-md !rounded-md bg-white !px-4 !py-2 text-left font-oswald flex justify-between items-center transition-opacity"
        :class="{
          'opacity-50 cursor-not-allowed': disabled,
          'hover:bg-gray-50': !disabled
        }"
        :disabled="disabled"
        @click="toggleDropdown"
    >
      <span class="text-2xl" :class="selected ? 'text-black' : 'text-gray-500'">
        {{ selectedText }}
      </span>
      <svg
          class="w-4 h-4 ml-2 transform transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
        v-if="isOpen && !disabled"
        class="absolute z-10 mt-1 w-full flex flex-col gap-2 bg-white rounded-md shadow-lg"
    >
      <div v-if="searchable" class="w-full !px-1">
        <BaseInput
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            @click.stop
        />
      </div>

      <ul class="max-h-60 overflow-y-auto">
        <li
            v-for="option in filteredOptions"
            :key="option.id"
            @click="select(option)"
            class="!px-4 !py-2 rounded text-2xl text-black hover:bg-black hover:text-white cursor-pointer font-oswald"
        >
          {{ option.name }}
        </li>

        <li
            v-if="searchable && filteredOptions.length === 0"
            class="!px-4 !py-2 text-xl text-gray-500 font-oswald text-center"
        >
          No results found
        </li>
      </ul>
    </div>
  </div>
</template>