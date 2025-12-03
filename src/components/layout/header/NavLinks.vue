<script setup lang="ts">
import { useUserStore } from "../../../../stores/user";
import {useAuth} from "@/composables/auth/useAuth";
import Link from "@/components/base/ui/Link.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps<{
  isMobileMenu?: boolean
}>();

const emit = defineEmits(['close-mobile-menu']);

const userStore = useUserStore();
const {handeLogout} = useAuth();

const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const isDarkMode = computed(() => props.isMobileMenu || isScrolled.value)
</script>

<template>
  <div class="flex flex-col md:flex-row space-x-0 md:space-x-6 gap-2.5">
    <div class="flex flex-col md:flex-row items-center gap-4 md:gap-5.5">
      <div class="flex flex-col md:flex-row gap-4 md:gap-5.5">
        <button
            v-if="!userStore.user"
            :class="isDarkMode
            ? '!text-white !border-white hover:!text-black hover:!bg-white'
            : '!text-black !border-black hover:!text-white hover:!bg-black'"
            class="
            font-oswald !font-bold !px-4 cursor-pointer
            !py-1 !text-lg !border-2 !rounded-lg
            inline-block transition-colors duration-300"
            @click="userStore.setAuthState('login')"
        >
          Login
        </button>
        <button
            v-else="!userStore.user"
            :class="isDarkMode
            ? '!text-white !border-white hover:!text-black hover:!bg-white'
            : '!text-black !border-black hover:!text-white hover:!bg-black'"
            class="
            font-oswald !font-bold !px-4 cursor-pointer
            !py-1 !text-lg !border-2 !rounded-lg
            inline-block transition-colors duration-300"
            @click="handeLogout"
        >
          Logout
        </button>
      </div>

        <Icon
            v-if="userStore.user && !userStore.user.google_id"
            icon="iconamoon:profile-circle-fill"
            class="w-7 h-7 cursor-pointer transition-colors duration-300"
            :class="isDarkMode
            ? 'text-white'
            : 'text-black'"
        />
      <router-link v-if="userStore.user && userStore.user.google_id" to="/profile">
        <img :src="userStore.user.avatar || ''" alt="user" class="w-10 h-10 rounded-full cursor-pointer"/>
      </router-link>
    </div>
  </div>
</template>