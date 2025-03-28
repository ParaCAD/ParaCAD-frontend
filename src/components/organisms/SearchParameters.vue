<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <input :placeholder="t('search.parameters.query')" type="text" v-model="query"/>
  <input id="search_descriptions" type="checkbox" v-model="search_descriptions"/> <label
    for="search_descriptions">{{ t('search.parameters.search_description') }}</label>
  <select id="sorting" v-model="sorting">
    <option value="newest">{{ t('search.parameters.sorting.newest') }}</option>
    <option value="oldest">{{ t('search.parameters.sorting.oldest') }}</option>
  </select>
  <button id="search-button" @click="search"><i class="fa fa-search"></i>Search</button>
</template>

<script>
import {defineComponent} from 'vue';
import "@/consts.js"

export default defineComponent({
  name: "SearchParameters",
  props: {
    search_params: {
      type: Object,
      required: false,
    }
  },
  data() {
    if (this.$props.search_params !== undefined && this.$props.search_params !== null) {
      return {
        query: this.$props.search_params.query,
        search_descriptions: this.$props.search_params.search_descriptions,
        sorting: this.$props.search_params.sorting,
        page_number: this.$props.search_params.page_number,
        page_size: this.$props.search_params.page_size,
      }
    }
    return {
      query: "",
      search_descriptions: false,
      sorting: "newest",
      page_number: 1,
      page_size: DEFAULT_PAGE_SIZE,
    }
  },
  methods: {
    search() {
      const search_params = {}
      if (this.query !== "") {
        search_params.query = this.query
      }
      if (this.search_descriptions) {
        search_params.search_descriptions = this.search_descriptions
      }
      if (this.sorting !== "newest") {
        search_params.sorting = this.sorting
      }
      if (this.page_number !== 1) {
        search_params.page_number = this.page_number
      }
      if (this.page_size !== DEFAULT_PAGE_SIZE) {
        search_params.page_size = this.page_size
      }

      this.$router.push({path: "/search", query: search_params});
    }
  }
})
</script>