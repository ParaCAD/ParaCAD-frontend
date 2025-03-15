<template>
  <div>
    <a :href="templateURL">{{ template.name }}</a> by {{ template.owner_name }}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "SearchResultRow",
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  computed: {
    templateURL() {
      return `/template/${this.template.uuid}`
    },
  },
  methods: {},
  components: {}
});
</script>

<style scoped>
div {
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  width: 50%;
}
</style>