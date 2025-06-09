<template>


</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CreateTemplateParameter",
  props: {
    parameter:{
      type: Object,
      required: true
    }
  },
  methods: {
    addParameter(type){
    }
  },
  components: {}
});
</script>