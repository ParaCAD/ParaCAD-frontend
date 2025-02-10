<template>
  <div>
    <div v-if="parameterType === 'int'">
      <ParameterInputInt ref="int" :parameter="parameter"/>
    </div>

    <div v-else-if="parameterType === 'string'">
      <ParameterInputString ref="string" :parameter="parameter"/>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import ParameterInputInt from '../atoms/ParameterInputInt.vue';
import ParameterInputString from '../atoms/ParameterInputString.vue';

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
    console.log("parameter input field " + props.parameterInput.parameter_name);
    return {
      parameterType: props.parameterInput.parameter_type,
      parameterInput: props.parameterInput,
      parameter: computed(() => {
        switch (props.parameterInput.parameter_type) {
          case ParameterType.Int:
            let minVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MinValue)?.value;
            let maxVal = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MaxValue)?.value;
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
          case ParameterType.String:
            let minLen = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MinLength)?.value;
            let maxLen = props.parameterInput.parameter_constraints.find((x) => x.type === ConstraintType.MaxLength)?.value;
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
      })
    }
  },
  methods: {},
  components: {ParameterInputInt, ParameterInputString}
});
</script>

<style></style>