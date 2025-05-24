<script setup>
import {useI18n} from 'vue-i18n'
import SearchResults from "@/components/organisms/SearchResults.vue";
import UserPageHeader from "@/components/atoms/UserPageHeader.vue";

const {t} = useI18n()
</script>

<template>
  <UserPageHeader :user_uuid="user_uuid" :username="username"/>
  <SearchResults :templates="templates"/>
</template>

<script>
import {computed, defineComponent} from 'vue';

import axios from 'axios';
import {i18n} from "@/i18n";

const {t} = i18n.global


export default defineComponent({
  name: "UserPage",
  props: {},
  data() {
    return {
      user_uuid: "",
      username: "",
      templates: []
    };
  },
  setup(props) {
    return {};
  },
  mounted() {
    const userUUID = this.$route.params.userUUID.trim()
    const uuidRegExp = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i")
    if (!uuidRegExp.test(userUUID)) {
      this.$router.push({path: "/"})
      alert("Nieprawidłowy UUID")
      return;
    }

    axios.get(BACKEND_URL + '/user/' + userUUID)
        .then(response => {
          this.username = response.data.user_name;
          this.user_uuid = response.data.user_uuid;
          if (response.data.templates === null) {
            this.templates = [];
            return;
          }
          this.templates = response.data.templates;
        })
        .catch(error => {
          if (error.response.status === 404) {
            alert(t('user.user_does_not_exist'))
            this.$router.push('/');
          }
          console.error(error);
        })
    console.log(this.templates)
  },
  components: {}
});

</script>

<style>
</style>