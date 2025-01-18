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

class ParameterWithValidation {
    name: string;
    displayName: string;
    type: string;
    default: number | string | boolean;
    constraints: Constraint[];

    constructor(name: string, displayName: string, type: string, defaultValue: number | string | boolean, constraints: Constraint[]) {
        this.name = name;
        this.displayName = displayName;
        this.type = type;
        this.default = defaultValue;
        this.constraints = constraints;
    }
}

export enum ConstraintType {
    MinValue = "min_value",
    MaxValue = "max_value",
    Step = "step",
    MinLength = "min_length",
    MaxLength = "max_length"
}

class Constraint {
    type: ConstraintType;
    value: number;

    constructor(type: ConstraintType, value: number) {
        this.type = type;
        this.value = value;
    }
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
            parameterType: props.parameterInput.type,
            parameterInput: props.parameterInput,
            parameter: computed(() => {
                switch (props.parameterInput.type) {
                    case ParameterType.Int:
                        let minVal = props.parameterInput.constraints.find((x:Constraint) =>x.type===ConstraintType.MinValue)?.value;
                        let maxVal = props.parameterInput.constraints.find((x:Constraint) =>x.type===ConstraintType.MaxValue)?.value;
                        if (minVal === undefined || maxVal === undefined) {
                            throw new Error('Min and max values must be defined for integer parameters');
                        }
                        return new ParameterWithValidationInt(props.parameterInput.name, 
                            props.parameterInput.displayName, 
                            props.parameterInput.default as number, 
                            minVal, maxVal);
                    case ParameterType.String:
                        let minLen = props.parameterInput.constraints.find((x:Constraint) =>x.type===ConstraintType.MinLength)?.value;
                        let maxLen = props.parameterInput.constraints.find((x:Constraint) =>x.type===ConstraintType.MaxLength)?.value;
                        if (minLen === undefined || maxLen === undefined) {
                            throw new Error('MinLen and maxLen values must be defined for string parameters');
                        }
                        return new ParameterWithValidationString(props.parameterInput.name, 
                            props.parameterInput.displayName, 
                            props.parameterInput.default as number, 
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