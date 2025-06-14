<script setup>
import {useI18n} from 'vue-i18n'
import UserWidget from "@/components/atoms/UserWidget.vue";
import NavBar from "@/components/organisms/NavBar.vue";

const {t} = useI18n()
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.svg" alt="Bootstrap" width="40" height="40">
      </router-link>
      <div class="navbar-nav position-absolute top-50 start-50 translate-middle">
        <router-link class="nav-link" to="/">{{ t("nav.home") }}</router-link>
        <router-link class="nav-link" to="/search">{{ t("nav.search") }}</router-link>
        <router-link v-if="!is_guest" class="nav-link" to="/createTemplate">{{ t("nav.create_template") }}</router-link>
      </div>
    </div>
    <UserWidget/>
  </nav>
</template>

<script >
import UserWidget from "@/components/atoms/UserWidget.vue";
import {computed, defineComponent} from "vue";
import {jwtDecode} from "jwt-decode";

export default defineComponent({
  name: "NavBar",
  props: {},
  methods: {},
  mounted() {
  },
  data() {
    const is_guest = computed(() => {
      return !localStorage.getItem('token')
    })
    return {
      username: '',
      is_guest: is_guest
    }
  },
  components: {UserWidget}
});
</script>

<style>
nav {
  background-color: #0083ff;
}

nav a {
  font-weight: bold;
  color: #ffffff !important;
}

nav a.router-link-exact-active {
  color: #222222 !important;
}
</style>