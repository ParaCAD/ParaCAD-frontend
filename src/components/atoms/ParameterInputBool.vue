<template>
  <div class="col-6">
    <label class="col-form-label" :for="parameter.name">{{ parameter.displayName }}</label>
  </div>
  <div class="col-6">
  <input :id="parameter.name" ref="field" type="checkbox" :name="parameter.name"
           class="form-check-input" v-model="value" @change="onUpdate"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ParameterInputBool',
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