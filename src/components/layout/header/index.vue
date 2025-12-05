<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavLinks from './NavLinks.vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
      :class="[
      'sticky top-0 z-[49] h-[90px] flex items-center justify-center transition-colors duration-300',
      isScrolled ? 'bg-black' : 'bg-[#FFFCFB]'
    ]"
  >
    <nav class="container !pr-5 h-[90px] border-b-2 border-black mx-auto flex justify-end items-center ">

      <div class="hidden md:flex items-center gap-8">
        <NavLinks />
      </div>

      <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden flex flex-col justify-between w-8 h-6 relative z-[100]"
          aria-label="Toggle menu"
      >
        <span
            class="block h-[2px] w-full rounded transition-all duration-300"
            :class="[
            isMenuOpen
              ? 'rotate-45 translate-y-[10px] bg-black'
              : isScrolled ? 'bg-white' : 'bg-black'
          ]"
        ></span>
        <span
            class="block h-[2px] w-full rounded transition-all duration-300"
            :class="[
            isMenuOpen ? 'opacity-0 bg-black' : '',
            isScrolled ? 'bg-white' : 'bg-black'
          ]"
        ></span>
        <span
            class="block h-[2px] w-full rounded transition-all duration-300"
            :class="[
            isMenuOpen
              ? '-rotate-45 -translate-y-[10px] bg-black'
              : isScrolled ? 'bg-white' : 'bg-black'
          ]"
        ></span>
      </button>
    </nav>

    <div
        :class="[
        'md:hidden !py-4 fixed left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-8 transition-all duration-300 z-[90]',
        isMenuOpen ? 'top-[90px] opacity-100 visible' : 'top-[90px] opacity-0 invisible'
      ]"
    >
      <NavLinks :is-mobile-menu="true" @closeMobileMenu="isMenuOpen = false" />
    </div>
  </header>
</template>