<script setup lang="ts">

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
</script>

<template>
  <FlexContainer>
    <FlexContainer width="100" direction="column" :gap="40">
      <p class="font-oswald text-9xl text-[#DD5C36]">404</p>
      <p class="font-oswald text-6xl text-black">This page doesn't exist. Let's take you somewhere that does</p>
      <router-link to="/">
        <BaseButton text="Back to home" variant="forth" size="lg"/>
      </router-link>
    </FlexContainer>
  </FlexContainer>
</template>
