<template>
  <div>
    {{ parameter.displayName }}
    <input ref="field" type="text" :name="parameter.name" :minlength="parameter.minLen" :maxlength="parameter.maxLen"
           v-model="value" @change="onUpdate"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ParameterInputInt',
  props: {
    parameter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: this.parameter.default,
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: this.parameter.name, value: this.value});
    },
  }
});
</script>