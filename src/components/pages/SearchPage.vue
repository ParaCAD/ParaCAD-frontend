<template>
  <SearchParameters :search_params="search_params"></SearchParameters>
  <SearchResults :templates="templates"/>
</template>

<script>
import {defineComponent, watchEffect} from 'vue';
import axios from 'axios';
import SearchResults from '@/components/organisms/SearchResults.vue';
import SearchParameters from "@/components/organisms/SearchParameters.vue";
import "@/consts.js"

const sorting_orders = ["newest", "oldest"]

export default defineComponent({
  name: "SearchPage",
  props: {},
  data() {
    return {
      templates: [],
      search_params: {}
    };
  },
  setup(props) {
    return {};
  },
  created() {
    watchEffect(() => this.reloadSearch());
    this.reloadSearch();
  },
  mounted() {
  },
  methods: {
    getParams() {
      const query = this.$route.query.query
      let search_descriptions = Boolean(this.$route.query.search_descriptions)
      if (search_descriptions !== true) {
        search_descriptions = false
      }
      let sorting = String(this.$route.query.sorting)
      console.log(sorting)
      console.log(sorting_orders)
      if (!sorting_orders.includes(sorting)) {
        sorting = "newest"
      }
      let page_number = Number(this.$route.query.page_number)
      if (isNaN(page_number)) {
        page_number = 1
      }
      let page_size = Number(this.$route.query.page_size)
      if (isNaN(page_size)) {
        page_size = DEFAULT_PAGE_SIZE
      }
      return {
        query: query,
        search_descriptions: search_descriptions,
        sorting: sorting,
        page_number: page_number,
        page_size: page_size,
      }
    },
    reloadSearch() {
      this.search_params = this.getParams();
      console.log(this.search_params);

      axios.post(BACKEND_URL + '/search', this.search_params)
          .then(response => {
            this.templates = response.data.results;
          })
          .catch(error => {
            console.error(error);
          })
    }
  },
  components: {SearchParameters, SearchResults}
});

</script>