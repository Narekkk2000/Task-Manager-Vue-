<script setup lang="ts">
import {useUserStore} from "../../../../stores/user";
import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Text from "@/components/base/ui/text/Text.vue";
import BaseButton from "@/components/base/ui/BaseButton.vue";
import Oath from "@/components/auth/oath/Oath.vue";

const userStore = useUserStore();
</script>

<template>
  <FlexContainer direction="column" :gap="20">
    <BaseButton
        type="submit"
        text="Login"
        variant="secondary"
    />
    <Oath/>
    <FlexContainer :gap="15">
      <Text size="sm">New Here?</Text>
      <BaseButton text="Create Account" variant="secondary"  @action="userStore.setAuthState('register')"/>
<!--      <Link to="/register" text="Create Account"/>-->
    </FlexContainer>
  </FlexContainer>
</template>
