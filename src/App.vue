<script setup>
import {useI18n} from 'vue-i18n'
import UserWidget from "@/components/atoms/UserWidget.vue";
import NavBar from "@/components/organisms/NavBar.vue";

const {t} = useI18n()
</script>

<template>
  <NavBar/>
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

#contents {
  margin-top: 20px;
}
</style>
