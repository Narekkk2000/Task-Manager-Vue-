<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useAuth} from "@/composables/auth/useAuth";
import {useUserStore} from "../../stores/user";
import {LoginFormData} from "@/interfaces/auth";

import { NModal } from "naive-ui"
import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import Heading from "@/components/base/ui/text/Heading.vue";
import InputStack from "@/components/auth/login/InputStack.vue";
import Actions from "@/components/auth/login/Actions.vue";

const formData = reactive(<LoginFormData>{
  email: null,
  password: null,
})
const userStore = useUserStore();
const showModal = ref(false);

watch(() => userStore.authState, (newState) => {
  showModal.value = newState === 'login';
});

const handleUpdateShow = (value: boolean) => {
  showModal.value = value;
  if (!value) {
    userStore.setAuthState('');
  }
};

const {errors, handleLogin} = useAuth();
</script>

<template>

  <n-modal
      :show="showModal"
      @update:show="handleUpdateShow"
  >
    <FlexContainer class="w-[90%] sm:w-[70%] md:w-[40%]">
      <FlexContainer
          as="form"
          direction="column"
          :gap="30"
          width="100"
          bg="white"
          radius="12"
          padding="12px 36px"
          @submit="handleLogin(formData)"
      >
        <Heading color="black">Enter Your Account</Heading>
        <InputStack :errors="errors" :formData="formData"/>
        <Actions/>
      </FlexContainer>
    </FlexContainer>
  </n-modal>

</template>
