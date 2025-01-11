<template>
    <div>
        {{ parameter.displayName }}
        <input type="text" :name="parameter.name" :minlength="parameter.minLen" :maxlength="parameter.maxLen"
            :value="parameter.default" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export class ParameterWithValidationString {
    name: string;
    displayName: string;
    default: number;
    minLen: number;
    maxLen: number;

    constructor(name: string, displayName: string, defaultValue: number, minLen: number, maxLen: number) {
        this.name = name;
        this.displayName = displayName;
        this.default = defaultValue;
        this.minLen = minLen;
        this.maxLen = maxLen;
    }
}

export default defineComponent({
    name: 'ParameterInputInt',
    props: {
        parameter: {
            type: Object as () => ParameterWithValidationString,
            required: true
        }
    },
    setup(props) {
        return {
            parameter: props.parameter
        }
    }
});
</script>