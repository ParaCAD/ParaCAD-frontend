<script setup>
import {useI18n} from 'vue-i18n'
import SearchResults from "@/components/organisms/SearchResults.vue";
import UserPageHeader from "@/components/atoms/UserPageHeader.vue";

const {t} = useI18n()
</script>

<template>
  <!--  TODO: add some more user info / edit options-->
  <div class="container w-50">
    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ username }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ t('user.template_count') }}: <br/> {{
                template_count
              }}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ t('user.last_login') }}: <br/> {{ last_login_time }}
            </h6>
            <p class="card-text">
              <textarea class="description" v-model="description" maxlength="400"></textarea>
            </p>
            <button :disabled="description === original_description" class="btn btn-success m-2" @click="save">{{ t('user.button_edit') }}</button>
            <button class="btn btn-danger">{{ t('user.button_delete') }}</button>
          </div>
        </div>
      </div>
      <div class="col-9">
        <UserPageHeader :user_uuid="user_uuid" :username="username"/>
        <SearchResults :templates="templates"/>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';

import axios from 'axios';
import {i18n} from "@/i18n";
import {jwtDecode} from "jwt-decode";

const {t} = i18n.global


export default defineComponent({
  name: "UserPage",
  props: {},
  data() {
    return {
      user_uuid: "",
      username: "",
      original_description: "",
      description: "",
      templates: [],
      template_count: 0,
      last_login_time: "",
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
          this.description = response.data.description;
          this.original_description = response.data.description;
          this.template_count = response.data.template_count;
          this.last_login_time = "Never";
          if (response.data.last_login_time !== null) {
            this.last_login_time = response.data.last_login_time;
          }
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
  },
  methods: {
    save() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized!");
        this.$router.push('/').then(() => {
          window.location.reload();
        });
      }
      const decodedToken = jwtDecode(token);

      let request = {
        description: this.description,
      }

      axios.post(BACKEND_URL + '/user/' + decodedToken.sub, request, {
        headers: {"Authorization": token}
      })
          .then(response => {
            window.location.reload();
          })
          .catch(error => {
            if (error.response.status === 400) {
              alert(error.response.data);
              return;
            }
            if (error.response.status === 401) {
              localStorage.removeItem("token");
              alert("Logged out!");
              this.$router.push('/').then(() => {
                window.location.reload();
              });
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
.description {
  height: 150px;
  max-height: 400px;
  min-height: 100px;
}
</style>