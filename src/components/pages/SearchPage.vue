<template>
  <div>TODO: search bar</div>
  <SearchResults :templates="templates"/>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import SearchResults from '@/components/organisms/SearchResults.vue';

const sorting_orders = ["newest", "oldest"]

export default defineComponent({
  name: "SearchPage",
  props: {},
  data() {
    return {
      templates: [{name: "aa"}, {name: "bb"}],
    };
  },
  setup(props) {
    return {};
  },
  created() {
    let search_params = this.getParams();
    console.log(search_params);

    axios.post('http://localhost:8081/search', search_params)
        .then(response => {
          this.templates = response.data.results;
        })
        .catch(error => {
          console.error(error);
        })
  },
  mounted() {
  },
  methods: {
    getParams() {
      const template_name = this.$route.query.template_name
      let search_descriptions = Boolean(this.$route.query.search_description)
      if (search_descriptions !== true) {
        search_descriptions = false
      }
      let sorting = this.$route.query.sort
      if (!(sorting in sorting_orders)) {
        sorting = "newest"
      }
      let page_number = Number(this.$route.query.page_number)
      if (isNaN(page_number)) {
        page_number = 1
      }
      let page_size = Number(this.$route.query.page_size)
      if (isNaN(page_size)) {
        page_size = 10
      }
      return {
        query: template_name,
        search_descriptions: search_descriptions,
        sorting: sorting,
        page_number: page_number,
        page_size: page_size,
      }
    },
  },
  components: {SearchResults}
});

</script>