<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="container-md">
    <SearchResultRow v-if="!is_empty" v-for="template in templates" :template="template"/>
  </div>
  <div v-if="is_empty" class="alert alert-primary w-50 position-absolute top-50 start-50 translate-middle">
    {{ t("search.results.empty") }}
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import SearchResultRow from "@/components/molecules/SearchResultRow.vue";


export default defineComponent({
  name: "SearchResults",
  props: {
    templates: {
      type: Array,
      required: true
    }
  },
  data() {
    const is_empty = computed(() => {
      return !this.templates || this.templates.length === 0
    })
    return {is_empty}
  },
  methods: {},
  components: {SearchResultRow,},
});
</script>