<template>
  <div class="user-widget d-flex text-center align-middle">
    <router-link class="nav-link" :to="userWidgetURL">
      <div class="username">
        <p v-if="is_guest">
          Log in
        </p>
        <p v-else>
          Logged in as <br/> {{ username }}
        </p>
      </div>
    </router-link>

    <div class="logout-button" v-if="!is_guest" :onclick="logout">
      <i class="fa fa-sign-out fa-lg align-middle"></i>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {jwtDecode} from "jwt-decode";

export default defineComponent({
  name: 'UserWidget',
  props: {
    username: {
      type: String,
      required: false
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp > Date.now()) {
        localStorage.removeItem('token');
      } else {
        this.userUUID = decodedToken.sub;
        this.username = decodedToken.login;
      }
    }
  },
  data() {
    const is_guest = computed(() => {
      if (this.username) {
        console.log(this.username);
        return this.username.length === 0
      }
      return true
    })
    return {
      userUUID: null,
      username: '',
      userWidgetURL: "/login",
      is_guest: is_guest
    }
  },
  computed: {
    userWidgetURL() {
      if (this.username) {
        return `/user/${this.userUUID}`;
      }else{
        return '/login'
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      delete this.username;
      delete this.userUUID;
      this.$router.push({path: "/"}).then(() => {
        window.location.reload();
      });
    }
  }
})
</script>

<style>
.user-widget {
  width: 150px;
  height: 50px;
}

.username {
  margin: 10px;
}

.logout-button {
  cursor: pointer;
}
</style>