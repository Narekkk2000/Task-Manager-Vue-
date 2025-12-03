<script lang="ts">
export default {
  emits: ['update:modelValue'],
  props: {
    type: String,
    modelValue: [String, Array],
    label: String,
    name: String,
    options: Array as () => Array<{value: string, text: string}>,
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue
      },
      set(value:string) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
  <div class="form-checkbox">
    <span class="label">{{label}}</span>
    <div class="checkbox">
      <label v-for="({value, text}) in options" :key="value">
        <input
            :type="type"
            name="trip"
            :value="value"
            v-model="internalValue"
        >
        {{text}}
      </label>
    </div>
  </div>
</template>

<style scoped>
.form-checkbox {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 5px
}
.checkbox {
  display: flex;
  gap: 30px
}
</style>