<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div>
    <img class="search_preview_image" :src="'http://localhost:8081/image/'+template.preview" alt="Generated model preview"/>
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

.search_preview_image {
  width: 300px;
  margin: 10px;
}
</style>