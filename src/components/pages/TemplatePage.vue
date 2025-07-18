<script setup>
import {useI18n} from 'vue-i18n'
import ModelDescription from "@/components/atoms/ModelDescription.vue";

const {t} = useI18n()
</script>

<template>
  <div class="container w-50">
    <img class="img-fluid rounded w-50" :src="template.template_preview" alt="Generated model preview"/>
    <h2 class="mt-2">
      {{ template.template_name }}
      <br/>
      ({{ t("template.created_by") }}
      <a v-if="!deleted_user" :href="/user/+template.owner_uuid">
        {{ template.owner_name }}
      </a>
      <span v-else>{{ t("template.deleted") }}</span>)
    </h2>
    <ModelDescription :description="template.template_description"/>
    <ModelForm :parameters="template.template_parameters"/>
    <button :disabled="is_error" class="btn btn-primary" @click="generate">{{ t("template.generate_button") }}</button>
    <br/>
    <button v-if="is_owner" class="btn btn-danger mt-2" @click="deleteTemplate">{{
        t("template.delete_button")
      }}
    </button>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';
import axios from 'axios';
import ModelForm from '@/components/organisms/ModelForm.vue';
import {jwtDecode} from "jwt-decode";

export default defineComponent({
  name: "TemplatePage",
  props: {},
  data() {
    let is_owner = computed(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp > Date.now()) {
          localStorage.removeItem('token');
        } else {
          if (this.template) {
            return this.template.owner_uuid === decodedToken.sub
          }
        }
      }
      return false;
    })
    console.log(is_owner)

    return {
      template: {
        template_uuid: '',
        template_name: '',
        template_description: '',
        template_preview: '',
        template_parameters: [],
        owner_uuid: '',
        owner_name: ''
      },
      is_owner: is_owner,
      values: {},
      errors: {},
      is_error: false,
    };
  },
  setup(props) {
    return {};
  },
  created() {
    const templateUUID = this.$route.params.templateUUID.trim()
    const uuidRegExp = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i")
    if (!uuidRegExp.test(templateUUID)) {
      this.$router.push({path: "/"})
      alert("Nieprawidłowy UUID")
      return;
    }

    axios.get(BACKEND_URL + '/template/' + templateUUID)
        .then(response => {
          this.template = response.data;
          this.template.template_preview = BACKEND_URL + '/image/' + this.template.template_preview;
          for (let parameter of this.template.template_parameters) {
            this.values[parameter.parameter_name] = parameter.parameter_default_value;
          }
        })
        .catch(error => {
          console.error(error);
        })
  },
  mounted() {
    this.emitter.on('update:field', (data) => {
      this.values[data.name] = data.value;
    });
    this.emitter.on('update:error', (data) => {
      this.errors[data.name] = data.value;
      this.is_error = null;
      if (!Object.values(this.errors).every(err => err === "")) {
        this.is_error = true;
      }
    });
  },
  methods: {
    generate() {
      let request = {"parameters": []}
      for (let [key, value] of Object.entries(this.values)) {
        request.parameters.push({
          "parameter_name": key,
          "parameter_value": value.toString()
        })
      }

      axios.post(BACKEND_URL + '/template/' + this.template.template_uuid + '/model', request)
          .then(response => {
            const decodedData = atob(response.data);
            const uInt8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; ++i) {
              uInt8Array[i] = decodedData.charCodeAt(i);
            }
            let blob = new Blob([uInt8Array], {type: "application/octet-stream"});
            this.download(blob, this.template.template_name + ".stl");
          }).catch(error => {
        console.error(error);
        alert(error.response.data);
      })
    },
    download(file, filename) {
      if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    deleteTemplate() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized!");
        return
      }

      axios.delete(BACKEND_URL + '/template/' + this.template.template_uuid, {
        headers: {"Authorization": token}
      })
          .then(() => {
            this.$router.push('/').then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            if (error.response.status === 403) {
              alert("Nie dla psa kiełbasa!");
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
    },
  },
  computed: {
    deleted_user() {
      return !this.template.owner_uuid;
    }
  },
  components: {ModelForm}
});

</script>

<style>
</style>