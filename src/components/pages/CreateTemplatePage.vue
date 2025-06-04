<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateForm from "@/components/organisms/CreateTemplateForm.vue";

const {t} = useI18n()
</script>

<template>
  <h2>{{ t("create_template.header") }}</h2>
  <div class="container w-50">
    <CreateTemplateForm/>
    <button class="btn btn-primary" @click="create">{{ t("create_template.create_button") }}</button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from "axios";

export default defineComponent({
  name: "CreateTemplatePage",
  props: {},
  data() {
    return {
      template: {
        template_name: 'Test',
        template_description: 'Test template description hardcoded in frontend',
        template_content: 'lorem ipsum dolor sit amet xDDDD',
        template_parameters: [],
      }
    };
  },
  setup() {
    return {};
  },
  mounted() {
    this.emitter.on('update:field', (data) => {
      this.template[data.name] = data.value;
    });
    this.emitter.on('update:parameter', (data) => {
      console.log('update parameter not implemented!!!: '+data);
    });
  },
  methods: {
    create() {
      let request = {}
      // TODO: validate
      request.template_name = this.template.template_name;
      request.template_description = this.template.template_description;
      request.template_content = this.template.template_content;

      console.log(request)

      const token = localStorage.getItem("token");
      if(!token){
        alert("Unauthorized!");
        this.$router.push('/').then(() => {
          window.location.reload();
        });
      }

      axios.post(BACKEND_URL + '/template', request,{
            headers: {"Authorization": token}
          })
          .then(response => {
            const template_uuid = response.data.template_uuid;
            if(!template_uuid){
              alert("Template ID missing from response!");
              this.$router.push('/').then(() => {
                window.location.reload();
              });
            }
            this.$router.push('/template/'+template_uuid).then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            if (error.response.status === 400) {
              alert(error.response.data);
              return;
            }
            if (error.response.status === 500) {
              alert("Internal Server Error");
              return;
            }
            console.error(error);
          })
    }
  }
});

</script>