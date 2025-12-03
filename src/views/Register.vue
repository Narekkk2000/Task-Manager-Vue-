<script setup lang="ts">
import {reactive, computed} from "vue";
import {useAuth} from "@/composables/auth/useAuth";
import {useUserStore} from "../../stores/user";
import {RegisterFormData} from "@/interfaces/auth";

import { NModal } from "naive-ui"
import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import InputStack from "@/components/auth/register/InputStack.vue";
import Actions from "@/components/auth/register/Actions.vue";

const formData = reactive(<RegisterFormData>{
  name: '',
  surname: '',
  email: '',
  birth_date: '',
  address: '',
  password: '',
});

const userStore = useUserStore();
const showModal = computed({
  get: () => userStore.authState === 'register',
  set: (value) => {
    if (!value) userStore.setAuthState('');
  }
});
const {errors, handleRegister} = useAuth();

</script>

<template>
<n-modal v-model:show="showModal">
  <FlexContainer width="40">
    <FlexContainer
        as="form"
        direction="column"
        :gap="40"
        width="100"
        bg="white"
        radius="12"
        padding="12px 36px"
        @submit="handleRegister(formData)"
    >
      <Heading color="black">Get Started</Heading>
      <InputStack :errors="errors" :formData="formData"/>
      <Actions />
    </FlexContainer>
  </FlexContainer>
  </n-modal>


</template>