<template>
  <div v-for="parameter in parameters">
    <ParameterInputField :key="parameter.parameter_name" :parameterInput="parameter"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ParameterInputField from '../molecules/ParameterInputField.vue';

export default defineComponent({
  name: "ModelForm",
  props: {
    parameters: {
      type: Array,
      required: true
    }
  },
  methods: {},
  components: {ParameterInputField}
});
</script>