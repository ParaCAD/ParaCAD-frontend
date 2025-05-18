<script setup>
import {useI18n} from 'vue-i18n'
import LoginUserForm from "@/components/organisms/LoginUserForm.vue";

const {t} = useI18n()
</script>

<template>
  <h2>{{ t('login.login') }}</h2>
  <div class="container w-25 mt-2 mb-2">
    <div class="row gy-1">
      <LoginUserForm/>
      <div class="col-6">
        <button class="btn btn-primary" @click="login">{{ t('login.login_button') }}</button>
      </div>
      <div class="col-6">
        <router-link to="/register">
          {{ t('login.no_account_register') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from "axios";

export default defineComponent({
  name: "LoginPage",
  props: {},
  data() {
    return {
      user_data: {},
    };
  },
  setup() {
    return {};
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/').then(() => {
        window.location.reload();
      });
    }
    this.emitter.on('update:field', (data) => {
      this.user_data[data.name] = data.value;
    });
  },
  methods: {
    login() {
      if (!this.user_data.username || this.user_data.username.length < 3) {
        alert("Please enter username");
        return;
      }
      if (!this.user_data.password || this.user_data.password.length < 3) {
        alert("Please enter password");
        return;
      }
      const request = {
        username: this.user_data.username,
        password: this.user_data.password,
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