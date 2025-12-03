<script setup lang="ts">
import {useUserStore} from "../../../../stores/user";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
import Text from "@/components/base/ui/text/Text.vue";

const userStore = useUserStore();
</script>

<template>
  <FlexContainer direction="column" :gap="20">
    <BaseButton
        type="submit"
        text="Send"
        variant="secondary"
    />
    <FlexContainer :gap="15">
      <Text size="sm">Return to Login</Text>
      <BaseButton text="Login" variant="secondary" @action="userStore.setAuthState('login')"/>
      <!--      <Link to="/register" text="Create Account"/>-->
    </FlexContainer>
  </FlexContainer>
</template>