<script setup>
import {useI18n} from 'vue-i18n'
import RegisterUserForm from "@/components/organisms/RegisterUserForm.vue";

const {t} = useI18n()
</script>

<template>
  <h2>{{ t('register.register') }}</h2>
  <div class="container w-25 mt-2 mb-2">
    <div class="row gy-1">
      <RegisterUserForm/>
      <div class="col-6">
        <button class="btn btn-primary" @click="register">{{ t('register.register_button') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import ModelForm from '@/components/organisms/ModelForm.vue';
import {i18n} from "@/i18n";

const {t} = i18n.global

export default defineComponent({
  name: "RegisterPage",
  data() {
    return {
      user_data: {},
    };
  },
  setup() {
    return {};
  },
  mounted() {
    this.emitter.on('update:field', (data) => {
      this.user_data[data.name] = data.value;
    });
  },
  created() {
  },
  methods: {
    register() {
      const request = {}
      if (!this.user_data.username){
        alert(t('register.fill_field')+" "+t('register.username'));
        return;
      }
      request.username = this.user_data.username;

      if (!this.user_data.email){
        alert(t('register.fill_field')+" "+t('register.email'));
        return;
      }
      request.email = this.user_data.email;

      if (!this.user_data.password){
        alert(t('register.fill_field')+" "+t('register.password'));
        return;
      }
      request.password = this.user_data.password;

      if (!this.user_data.repeat_password){
        alert(t('register.fill_field')+" "+t('register.repeat_password'));
        return;
      }
      if (this.user_data.password !== this.user_data.repeat_password){
        alert(t('register.passwords_not_match'));
        return;
      }

      axios.post(BACKEND_URL + '/register', request)
          .then(response => {
            this.$router.push('/').then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            if (error.response.status === 400) {
              alert(error.response.data);
              return;
            }
            if (error.response.status === 409) {
              alert(t('register.user_exists'));
              return;
            }
            if (error.response.status === 500) {
              alert("Internal Server Error");
              return;
            }
            console.error(error);
          })
    }
  },
  components: {}
});

</script>

<style>
</style>