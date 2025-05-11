<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <h2>{{ t('login.login') }}</h2>
  <div class="container w-25 mt-2 mb-2">
    <div class="row gy-1">
      <div class="col-6">
        {{ t('login.username') }}
      </div>
      <div class="col-6">
        <input type="text" v-model="username">
      </div>
      <div class="col-6">
        {{ t('login.password') }}
      </div>
      <div class="col-6">
        <input type="password" v-model="password">
      </div>
      <div class="col-6">
        <button class="btn btn-primary" @click="login">{{ t('login.login_button') }}</button>
      </div>
      <div class="col-6">
        TODO
        {{ t('login.no_account_register') }}
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import userWidget from "@/components/atoms/UserWidget.vue";

export default defineComponent({
  name: "LoginPage",
  props: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/');
    }
    return {};
  },
  methods: {
    login() {
      if (!this.username || this.username.length < 3) {
        alert("Please enter username");
        return;
      }
      if (!this.password || this.password.length < 3) {
        alert("Please enter password");
        return;
      }
      const request = {
        username: this.username,
        password: this.password,
      }

      axios.post(BACKEND_URL + '/login', request)
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.$router.push('/').then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            if (error.response.status === 401) {
              alert("Invalid Credentials");
            }
            console.error(error);
          })
    }
  }
});

</script>