<script setup lang="ts">
import {RegisterFormData, RegisterFormErrors} from "@/interfaces/auth";
import {FORM_FIELDS} from "@/constants/formFields";

import FlexContainer from "@/components/base/containers/FlexContainer.vue";
import BaseInput from "@/components/base/form/BaseInput.vue";

defineProps<{
  formData: RegisterFormData;
  errors: RegisterFormErrors;
}>();
</script>

<template>
  <FlexContainer class="w-[70%] sm:w-[60%]" direction="column" :gap="15"  >
    <BaseInput
        v-for="({ id, type, placeholder }) in Object.values(FORM_FIELDS)"
        :key="id"
        v-model.trim="formData[id]"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :error="errors[id]"
        :style="{width: '100%'}"
    />
  </FlexContainer>
</template>