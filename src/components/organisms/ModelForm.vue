<template>
  <div>
    <ParameterInputField v-for="parameter in parameters" :key="parameter.parameter_name" :parameterInput="parameter" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ParameterInputField from '../molecules/ParameterInputField.vue';
import {ParameterWithValidation} from '../molecules/ParameterInputField.vue';

export default defineComponent({
  name: "ModelForm",
  props: {
    parameters: {
      type: Array as () => ParameterWithValidation[],
      required: true
    }
  },
  setup(props) {
    console.log(props.parameters);
    return {
      parameters: props.parameters
    };
  },
  methods: {
  },
  components: { ParameterInputField }
});
</script>