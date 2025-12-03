<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "../stores/user";

import Header from "@/components/layout/header/index.vue";
import CenterBlock from "@/components/base/containers/CenterBlock.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Tasks from "@/components/tasks/Tasks.vue";

const userStore = useUserStore();
onMounted(() => {
  if(!userStore.user) {
    userStore.fetchUser()
  }
})
</script>

<template>
  <Header/>
  <CenterBlock>
    <Tasks/>
    <Login />
    <Register />
  </CenterBlock>
</template>
