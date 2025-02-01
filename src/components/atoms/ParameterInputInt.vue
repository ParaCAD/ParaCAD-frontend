<template>
  <div>
    {{ parameter.displayName }}
    <input ref="field" type="number" :name="parameter.name" :min="parameter.min" :max="parameter.max" step="1"
           v-model="value" @change="onUpdate"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

// export class ParameterWithValidationInt {
//   name: string;
//   displayName: string;
//   default: number;
//   min: number;
//   max: number;
//
//   constructor(name: string, displayName: string, defaultValue: number, min: number, max: number) {
//     this.name = name;
//     this.displayName = displayName;
//     this.default = defaultValue;
//     this.min = min;
//     this.max = max;
//   }
// }

export default defineComponent({
  name: 'ParameterInputInt',
  props: {
    parameter: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      value: this.parameter.default,
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name:this.parameter.name, value: this.value});
    },
  }
});
</script>