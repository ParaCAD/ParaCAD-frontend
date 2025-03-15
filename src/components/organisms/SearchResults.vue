<template>
  <SearchResultRow v-for="template in templates" :template="template"/>
</template>

<script>
import {defineComponent} from 'vue';
import SearchResultRow from "@/components/molecules/SearchResultRow.vue";

export default defineComponent({
  name: "SearchResults",
  props: {
    templates: {
      type: Array,
      required: true
    }
  },
  methods: {},
  components: {SearchResultRow,},
});
</script>