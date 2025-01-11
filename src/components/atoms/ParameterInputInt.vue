<template>
    <div>
        {{ parameter.displayName }}
        <input type="number" :name="parameter.name" :min="parameter.min" :max="parameter.max" step="1"
            :value="parameter.default" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export class ParameterWithValidationInt {
    name: string;
    displayName: string;
    default: number;
    min: number;
    max: number;

    constructor(name: string, displayName: string, defaultValue: number, min: number, max: number) {
        this.name = name;
        this.displayName = displayName;
        this.default = defaultValue;
        this.min = min;
        this.max = max;
    }
}

export default defineComponent({
    name: 'ParameterInputInt',
    props: {
        parameter: {
            type: Object as () => ParameterWithValidationInt,
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