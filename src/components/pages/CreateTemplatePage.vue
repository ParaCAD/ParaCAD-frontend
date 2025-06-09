<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateForm from "@/components/organisms/CreateTemplateForm.vue";

const {t} = useI18n()
</script>

<template>
  <h2>{{ t("create_template.header") }}</h2>
  <div class="container w-75">
    <CreateTemplateForm :parameters="template.template_parameters"/>
    <button :disabled="is_error" class="btn btn-primary" @click="create">{{ t("create_template.create_button") }}</button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from "axios";
import {i18n} from "@/i18n";
import {ParameterType} from "@/components/atoms/ParameterConsts";

const {t} = i18n.global

export default defineComponent({
  name: "CreateTemplatePage",
  props: {},
  data() {
    return {
      template: {
        template_name: '',
        template_description: '',
        template_content: '',
        template_parameters: [{type:"int",name:"aaa", display_name:"Aaa", value:"123", min:"1", max:"200"}],
      },
      errors: {},
      is_error: true,
    };
  },
  setup() {
    return {};
  },
  mounted() {
    this.emitter.on('update:field', (data) => {
      this.template[data.name] = data.value;
    });
    this.emitter.on('update:add_parameter', (data) => {
      this.template.template_parameters.push(this.create_empty_parameter(data.type));
    });
    this.emitter.on('update:parameter', (data) => {
      console.log('update parameter not implemented!!!: '+data);
    });
    this.emitter.on('update:error', (data) => {
      this.errors[data.name] = data.value;
      this.is_error = null;
      if (!Object.values(this.errors).every(err => err === "")){
        this.is_error = true;
      }
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
            if (error.response.status === 401) {
              localStorage.removeItem("token");
              alert("Logged out!");
              this.$router.push('/').then(() => {
                window.location.reload();
              });
              return;
            }
            if (error.response.status === 409) {
              alert(t('create_template.error.ungeneratable'));
              return;
            }
            if (error.response.status === 500) {
              alert("Internal Server Error");
              return;
            }
            console.error(error);
          })
    },
    create_empty_parameter(type) {
      switch (type) {
        case ParameterType.Int:
          return {type: ParameterType.Int,
          name:"parameter",
          display_name:"Parameter Name",
          value:5, min:0,max:10}
        case ParameterType.Float:
          return {type: ParameterType.Float,
            name:"parameter",
            display_name:"Parameter Name",
            value:5.0, min:0.0,max:10.0, step:0.5}
        case ParameterType.String:
          return {type: ParameterType.String,
            name:"parameter",
            display_name:"Parameter Name",
            value:"text", minLen:"3",maxLen:"10"}
        case ParameterType.Bool:
          return {type: ParameterType.Bool,
            name:"parameter",
            display_name:"Parameter Name",
            value:false}
      }
    }
  }
});

</script>