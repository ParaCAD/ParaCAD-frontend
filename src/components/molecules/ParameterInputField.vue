<template>
  <ParameterInputInt v-if="parameterType === 'int'" ref="int" :parameter="parameter"/>
  <ParameterInputString v-else-if="parameterType === 'string'" ref="string" :parameter="parameter"/>
  <ParameterInputFloat v-else-if="parameterType === 'float'" ref="float" :parameter="parameter"/>
  <ParameterInputBool v-else-if="parameterType === 'bool'" ref="bool" :parameter="parameter"/>
</template>

<script>
import {computed, defineComponent} from 'vue';
import ParameterInputInt from '../atoms/ParameterInputInt.vue';
import ParameterInputString from '../atoms/ParameterInputString.vue';
import ParameterInputFloat from "@/components/atoms/ParameterInputFloat.vue";
import ParameterInputBool from "@/components/atoms/ParameterInputBool.vue";

const ParameterType = {
  Int: 'int',
  Float: 'float',
  String: 'string',
  Bool: 'bool'
}

const ConstraintType = {
  MinValue: "min_value",
  MaxValue: "max_value",
  Step: "step",
  MinLength: "min_length",
  MaxLength: "max_length"
}

export default defineComponent({
  name: 'ParameterInputField',
  props: {
    parameterInput: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      parameterType: props.parameterInput.parameter_type,
      parameterInput: props.parameterInput,
      parameter: computed(() => {
        switch (props.parameterInput.parameter_type) {
          case ParameterType.Int: {
            const minVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MinValue)?.value;
            const maxVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MaxValue)?.value;
            if (minVal === undefined || maxVal === undefined) {
              throw new Error('Min and max values must be defined for integer parameters');
            }
            return {
              name: props.parameterInput.parameter_name,
              displayName: props.parameterInput.parameter_display_name,
              default: props.parameterInput.parameter_default_value,
              min: minVal,
              max: maxVal
            };
          }
          case ParameterType.String: {
            const minLen = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MinLength)?.value;
            const maxLen = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MaxLength)?.value;
            if (minLen === undefined || maxLen === undefined) {
              throw new Error('MinLen and maxLen values must be defined for string parameters');
            }
            return {
              name: props.parameterInput.parameter_name,
              displayName: props.parameterInput.parameter_display_name,
              default: props.parameterInput.parameter_default_value,
              minLen: minLen,
              maxLen: maxLen
            };
          }
          case ParameterType.Float: {
            const minVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MinValue)?.value;
            const maxVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MaxValue)?.value;
            const step = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.Step)?.value;
            if (minVal === undefined || maxVal === undefined || step === undefined) {
              throw new Error('Min, max and step values must be defined for float parameters');
            }
            return {
              name: props.parameterInput.parameter_name,
              displayName: props.parameterInput.parameter_display_name,
              default: props.parameterInput.parameter_default_value,
              min: minVal,
              max: maxVal,
              step: step,
            };
          }
          case ParameterType.Bool: {
            return {
              name: props.parameterInput.parameter_name,
              displayName: props.parameterInput.parameter_display_name,
              default: props.parameterInput.parameter_default_value,
            };
          }
        }
      })
    }
  },
  methods: {},
  components: {ParameterInputFloat, ParameterInputInt, ParameterInputString, ParameterInputBool}
});
</script>

<style>
input:invalid {
  border: 1px solid red;
}
</style>