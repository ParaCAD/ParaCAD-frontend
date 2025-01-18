<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <ParameterInputField ref="i1" :parameterInput="input1" />
    <ParameterInputField ref="i2" :parameterInput="input2" />
    <button @click="debugClick">Debug</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ParameterInputField from './molecules/ParameterInputField.vue';
import { ConstraintType } from './molecules/ParameterInputField.vue';

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
          { type: ConstraintType.MaxValue, value: 100 },]
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
  methods: {
    debugClick() {
      const input1 = this.$refs['i1'] as typeof ParameterInputField;
      const input2 = this.$refs['i2'] as typeof ParameterInputField;
      console.log(input2.getValue() + " " + input1.getValue());
    }
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
