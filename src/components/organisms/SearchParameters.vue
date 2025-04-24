<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="container-sm text-center">
    <div class="row align-items-center">
      <div class="col-6">
        <input :placeholder="t('search.parameters.query')" type="text" class="form-control" v-model="query"/>
      </div>
      <div class="col-2">
        <div class="form-check form-switch">
          <input id="search_descriptions" type="checkbox" class="form-check-input" role="switch" v-model="search_descriptions"/>
          <label for="search_descriptions" class="form-check-label fs-5">{{ t('search.parameters.search_description') }}</label>
        </div>
      </div>
      <div class="col-2">
        <select id="sorting" class="form-select" v-model="sorting">
          <option value="newest">{{ t('search.parameters.sorting.newest') }}</option>
          <option value="oldest">{{ t('search.parameters.sorting.oldest') }}</option>
        </select>
      </div>
      <div class="col-2">
        <button id="search-button" class="btn btn-secondary w-75" @click="search"><i class="fa fa-search"></i> Search</button>
      </div>
    </div>
  </div>
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