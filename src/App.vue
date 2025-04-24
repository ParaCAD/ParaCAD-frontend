<script setup>
import {useI18n} from 'vue-i18n'

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
  </nav>
  <div class="container-fluid" id="contents">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

#contents {
  margin-top: 20px;
}
</style>
