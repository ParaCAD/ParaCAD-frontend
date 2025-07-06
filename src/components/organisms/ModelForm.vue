<template>
  <div class="container w-50 ModelForm mt-2 mb-2">
    <div v-for="parameter in parameters" class="row p-1 align-items-center">
      <ParameterInputField :key="parameter.parameter_name" :parameterInput="parameter"/>
    </div>
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