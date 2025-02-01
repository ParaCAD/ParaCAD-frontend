<template>
  <div>
    {{ parameter.displayName }}
    <input ref="field" type="text" :name="parameter.name" :minlength="parameter.minLen" :maxlength="parameter.maxLen"
           v-model="modelValue"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export class ParameterWithValidationString {
  name: string;
  displayName: string;
  default: number;
  minLen: number;
  maxLen: number;

  constructor(name: string, displayName: string, defaultValue: number, minLen: number, maxLen: number) {
    this.name = name;
    this.displayName = displayName;
    this.default = defaultValue;
    this.minLen = minLen;
    this.maxLen = maxLen;
  }
}

export default defineComponent({
  name: 'ParameterInputInt',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    parameter: {
      type: Object as () => ParameterWithValidationString,
      required: true
    }
  },
  methods: {
    getValue(): string {
      const field = this.$refs['field'] as HTMLInputElement;
      var value = field.value;
      if (value.length < this.parameter.minLen) {
        field.value = field.value + "A".repeat(this.parameter.minLen - value.length);
      }
      if (value.length > this.parameter.maxLen) {
        field.value = field.value.substring(0, this.parameter.maxLen);
      }
      return field.value;
    }
  }
});
</script>