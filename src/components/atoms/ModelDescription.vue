<template>
  <div class="container w-50">
    {{ description }}
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModelDescription",
  props: {
    description: {
      type: String,
      required: true,
    }
  },
})
</script>