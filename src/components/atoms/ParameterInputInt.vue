<template>
    <div>
        {{ parameter.displayName }}
        <input ref="field" type="number" :name="parameter.name" :min="parameter.min" :max="parameter.max" step="1"
            :value="parameter.default" />
    </div>
</template>

<script lang="ts">
import { useTemplateRef, defineComponent } from 'vue';

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
    },
    methods: {
        getValue(): string {
            const field = this.$refs['field'] as HTMLInputElement;
            var value = parseInt(field.value);
            if (value < this.parameter.min) {
                field.value = this.parameter.min.toString();
            }
            if (value > this.parameter.max) {
                field.value = this.parameter.max.toString();
            }
            return field.value;
        }
    }
});
</script>