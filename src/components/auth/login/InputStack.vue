<script setup lang="ts">
import {LoginFormData, LoginFormErrors} from "@/interfaces/auth";
import {FORM_FIELDS} from "@/constants/formFields";

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseInput from "@/components/base/form/BaseInput.vue";

defineProps<{
  formData: LoginFormData;
  errors: LoginFormErrors;
}>();
</script>

<template>
  <FlexContainer class="w-[70%] sm:w-[60%]" direction="column" :gap="20">
    <BaseInput
        v-model.trim="formData.email"
        type="email"
        id="email"
        :error="errors.email"
        :placeholder="FORM_FIELDS.email.placeholder"
        :style="{width: '100%'}"
    />
    <BaseInput
        v-model.trim="formData.password"
        type="password"
        id="password"
        :error="errors.password"
        :placeholder="FORM_FIELDS.password.placeholder"
        :style="{width: '100%'}"
    />
  </FlexContainer>
</template>

