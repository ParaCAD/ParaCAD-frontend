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
        <img src="@/assets/logo.png" alt="Bootstrap" width="30" height="30">
      </router-link>
      <!--      TODO: replace with img-->
      <div class="navbar-nav position-absolute top-50 start-50 translate-middle">
        <router-link class="nav-link" to="/">{{ t("nav.home") }}</router-link>
        <router-link class="nav-link" to="/search">{{ t("nav.search") }}</router-link>
      </div>
    </div>
    <router-link class="nav-link" :to="userWidgetURL">
      <UserWidget :username="username"/>
    </router-link>
  </nav>
</template>

<script >
import UserWidget from "@/components/atoms/UserWidget.vue";
import {defineComponent} from "vue";
import {jwtDecode} from "jwt-decode";

export default defineComponent({
  name: "NavBar",
  props: {},
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp > Date.now()) {
        localStorage.removeItem('token');
      } else {
        this.userUUID = decodedToken.sub;
        this.username = decodedToken.login;
        this.userWidgetURL = "/user/" + decodedToken.sub;
      }
    }
  },
  data() {
    return {
      userUUID: null,
      username: '',
      userWidgetURL: "/login",
    }
  },
  methods: {},
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