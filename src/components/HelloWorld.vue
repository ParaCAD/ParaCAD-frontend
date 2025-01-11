<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <ParameterInputField :parameterInput="input1" />
    <ParameterInputField :parameterInput="input2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ParameterInputField from './molecules/ParameterInputField.vue';
import {ConstraintType} from './molecules/ParameterInputField.vue';

export default defineComponent({
    name: "HelloWorld",
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup(props) {
        return {
            msg: props.msg,
            input1: {
                name: 'test',
                type: 'int',
                displayName: 'Test',
                default: 0,
                constraints: [
                    { type: ConstraintType.MinValue, value: 0 },
                    { type: ConstraintType.MaxValue, value: 100 },                ]
            },
            input2: {
                name: 'text',
                type: 'string',
                displayName: 'Text',
                default: 'Hello',
                constraints: [
                    { type: ConstraintType.MinLength, value: 2 },
                    { type: ConstraintType.MaxLength, value: 10 }
                ]
            }
        };
    },
    components: { ParameterInputField }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
