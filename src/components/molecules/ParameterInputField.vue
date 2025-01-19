<template>
    <div>
        <div v-if="parameterType === 'int'">
            <ParameterInputInt ref="int" :parameter="parameter" />
        </div>

        <div v-else-if="parameterType === 'string'">
            <ParameterInputString ref="string" :parameter="parameter" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ParameterInputInt from '../atoms/ParameterInputInt.vue';
import {ParameterWithValidationInt} from '../atoms/ParameterInputInt.vue';
import ParameterInputString from '../atoms/ParameterInputString.vue';
import {ParameterWithValidationString} from '../atoms/ParameterInputString.vue';

enum ParameterType {
    Int = 'int',
    Float = 'float',
    String = 'string',
    Bool = 'bool'
}

export interface ParameterWithValidation {
    parameter_name: string;
    parameter_display_name: string;
    parameter_type: string;
    parameter_default_value: number | string | boolean;
    parameter_constraints: Constraint[];
}

export enum ConstraintType {
    MinValue = "min_value",
    MaxValue = "max_value",
    Step = "step",
    MinLength = "min_length",
    MaxLength = "max_length"
}

interface Constraint {
    type: ConstraintType;
    value: number;
}


export default defineComponent({
    name: 'ParameterInputField',
    props: {
        parameterInput: {
            type: Object as () => ParameterWithValidation,
            required: true
        }
    },
    setup(props) {
        return {
            parameterType: props.parameterInput.parameter_type,
            parameterInput: props.parameterInput,
            parameter: computed(() => {
                switch (props.parameterInput.parameter_type) {
                    case ParameterType.Int:
                        let minVal = props.parameterInput.parameter_constraints.find((x:Constraint) =>x.type===ConstraintType.MinValue)?.value;
                        let maxVal = props.parameterInput.parameter_constraints.find((x:Constraint) =>x.type===ConstraintType.MaxValue)?.value;
                        if (minVal === undefined || maxVal === undefined) {
                            throw new Error('Min and max values must be defined for integer parameters');
                        }
                        return new ParameterWithValidationInt(props.parameterInput.parameter_name, 
                            props.parameterInput.parameter_display_name, 
                            props.parameterInput.parameter_default_value as number, 
                            minVal, maxVal);
                    case ParameterType.String:
                        let minLen = props.parameterInput.parameter_constraints.find((x:Constraint) =>x.type===ConstraintType.MinLength)?.value;
                        let maxLen = props.parameterInput.parameter_constraints.find((x:Constraint) =>x.type===ConstraintType.MaxLength)?.value;
                        if (minLen === undefined || maxLen === undefined) {
                            throw new Error('MinLen and maxLen values must be defined for string parameters');
                        }
                        return new ParameterWithValidationString(props.parameterInput.parameter_name, 
                            props.parameterInput.parameter_display_name, 
                            props.parameterInput.parameter_default_value as number, 
                            minLen, maxLen);
                }
            })
        }
    },
    methods: {
        getValue(): string {
            const field = this.$refs[this.parameterType] as typeof ParameterInputString | typeof ParameterInputInt;
            return field.getValue();
        }
    },
    components: { ParameterInputInt, ParameterInputString }
});
</script>

<style></style>