<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <SearchResultRow v-if="!is_empty" v-for="template in templates" :template="template"/>
  <div v-if="is_empty">
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
      return this.templates === null || this.templates.length === 0
    })
    return {is_empty}
  },
  methods: {},
  components: {SearchResultRow,},
});
</script>