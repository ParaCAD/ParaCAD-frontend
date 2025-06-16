<template>
  <div v-if="err" class="template-validation-error mt-1">
    {{ err }}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TemplateValidationError',
  props: {
    err: {
      type: String,
    }
  }
});
</script>

<style>
.template-validation-error {
  height: 50px;
  color: red;
}

</style>