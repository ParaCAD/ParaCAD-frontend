<template>
  <div v-for="parameter in parameters">
    <ParameterInputField :key="parameter.parameter_name" :parameterInput="parameter"
                         v-model="modelValue[parameter.parameter_name]"/>
  </div>
</template>

<script>
import {defineComponent, reactive} from 'vue';
import ParameterInputField from '../molecules/ParameterInputField.vue';
import {ParameterWithValidation} from '../molecules/ParameterInputField.vue';

export default defineComponent({
  name: "ModelForm",
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    parameters: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    console.log("model form " + props.parameters.length);
    for (let parameter of props.parameters) {
      console.log("model form parameter " + parameter.parameter_name + " " + parameter.parameter_default_value);
      props.modelValue[parameter.parameter_name] = parameter.parameter_default_value;
    }
  },
  methods: {},
  components: {ParameterInputField}
});
</script>