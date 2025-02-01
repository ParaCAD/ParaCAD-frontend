<template>
  <div>
    {{ parameter.displayName }}
    <input ref="field" type="number" :name="parameter.name" :min="parameter.min" :max="parameter.max" step="1"
           v-model="modelValue" @input="updateValue"/>
  </div>
</template>

<script lang="ts">
import {useTemplateRef, defineComponent} from 'vue';

export class ParameterWithValidationInt {
  name: string;
  displayName: string;
  default: number;
  min: number;
  max: number;

  constructor(name: string, displayName: string, defaultValue: number, min: number, max: number) {
    this.name = name;
    this.displayName = displayName;
    this.default = defaultValue;
    this.min = min;
    this.max = max;
  }
}

export default defineComponent({
  name: 'ParameterInputInt',
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    parameter: {
      type: Object as () => ParameterWithValidationInt,
      required: true
    }
  },
  methods: {
    updateValue(event: Event) {
      if (event.target instanceof HTMLInputElement) {
        this.$emit("update:modelValue", event.target.value);
      }
    }
  }
});
</script>