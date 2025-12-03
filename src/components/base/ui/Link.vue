<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  to: string
  text: string
  isMobileMenu?: boolean
}>()

const route = useRoute()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const isActive = computed(() => route.path === props.to)

const isDarkMode = computed(() => props.isMobileMenu || isScrolled.value)
</script>

<template>
  <router-link
      :to="to"
      class="font-oswald text-center !font-bold !px-4 !py-1 text-xl !border-2 rounded-lg inline-block transition-colors duration-300"
      :class="[
      isActive
        ? (isDarkMode
            ? '!border-white !bg-white !text-black'
            : '!border-black !bg-black !text-white'
          )
        : (isDarkMode
            ? '!text-white !border-transparent hover:!text-black hover:!border-white hover:!bg-white'
            : '!text-black !border-transparent hover:!text-white hover:!border-black hover:!bg-black'
          )
    ]"
  >
    {{ text }}
  </router-link>
</template>