<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="card">
    <a :href="templateURL">
      <img class="card-img-top" :src="'http://localhost:8081/image/'+template.preview" alt="Generated model preview"/>
      <div class="card-body">
        <h5 class="card-title">{{ template.name }}</h5>
        {{ t("search.results.by_author") }} {{ owner_name }} ({{ t("search.results.created") }} {{ template.created }})
      </div>
    </a>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {i18n} from "@/i18n";

const {t} = i18n.global

export default defineComponent({
  name: "SearchResultRow",
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  computed: {
    owner_name() {
      if (this.template.owner_name) {
        return this.template.owner_name
      }
      return t("template.deleted")
    },
    templateURL() {
      return `/template/${this.template.uuid}`
    },
  },
  methods: {},
  components: {}
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.card {
  margin: 10px;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}
</style>