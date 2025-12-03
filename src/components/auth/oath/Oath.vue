<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {Icon} from '@iconify/vue'
import {useUserStore} from "../../../../stores/user";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";

const router = useRouter();
const API_URL = import.meta.env.VITE_API_URL;
const userStore = useUserStore();

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get("success");

  if (success === "true") {
    try {
      // Fetch the authenticated user (session is already set by Laravel)
      await userStore.fetchUser();

      // Remove query string from URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Failed to load user after Google login:", error);
      router.push("/login");
    }
  }
});

function loginWithGoogle() {
  window.location.href = `${API_URL}/google/redirect`;
}
</script>

<template>
  <FlexContainer :gap="20" >
<!--    <p @click="loginWithGoogle" class="google-btn">-->
<!--      Continue with Google-->
<!--    </p>-->
<!--    <p class="font-oswald text-lg !font-bold">Login with google</p>-->
    <Icon
        @click="loginWithGoogle"
        icon="flat-color-icons:google"
        class="w-12 h-12 cursor-pointer"
    />
  </FlexContainer>
</template>

<style scoped>
.google-btn {
  background-color: #4285f4;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.google-btn:hover {
  background-color: #357ae8;
}
</style>