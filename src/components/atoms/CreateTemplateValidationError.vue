<template>
  <div v-if="err" class="col-12 alert alert-danger">
    {{ err }}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CreateTemplateValidationError',
  props: {
    err: {
      type: String,
    }
  }
});
</script>