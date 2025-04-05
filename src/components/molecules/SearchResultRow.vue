<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div>
    <a :href="templateURL">{{ template.name }}</a>
    {{ t("search.results.by_author") }} {{ template.owner_name }} ({{ t("search.results.created") }} {{ template.created }})
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