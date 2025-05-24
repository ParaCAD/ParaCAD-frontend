<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div v-if="!is_current_user">
    <h2>{{ t("user.users_templates") }} {{ this.username }}:</h2>
  </div>
  <div v-else>
    <h2>{{ t("user.your_templates") }}:</h2>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {jwtDecode} from "jwt-decode";

export default defineComponent({
  name: 'UserPageHeader',
  props: {
    user_uuid:{
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
  },
  data() {
    const token = localStorage.getItem('token');
    let currentUserUUID = null;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp > Date.now()) {
        localStorage.removeItem('token');
      } else {
        currentUserUUID = decodedToken.sub;
      }
    }
    const is_current_user = computed(() => {
      return currentUserUUID === this.user_uuid;
    })
    return {
      is_current_user: is_current_user
    }
  },
  methods: {
  }
});
</script>