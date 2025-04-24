<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="card">
    <a :href="templateURL">
      <img class="card-img-top" :src="'http://localhost:8081/image/'+template.preview" alt="Generated model preview"/>
      <!--    TODO: handle missing preview-->
      <div class="card-body">
        <h5 class="card-title">{{ template.name }}</h5>
        {{ t("search.results.by_author") }} {{ template.owner_name }} ({{ t("search.results.created") }} {{ template.created }})
      </div>
    </a>
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
a {
  text-decoration: none;
  color: inherit;
}

.card {
  margin: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>