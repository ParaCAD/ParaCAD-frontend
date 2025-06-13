<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateForm from "@/components/organisms/CreateTemplateForm.vue";

const {t} = useI18n()
</script>

<template>
  <h2>{{ t("create_template.header") }}</h2>
  <div class="container w-75">
    <CreateTemplateForm :parameters="template.template_parameters"/>
    <button :disabled="is_error" class="btn btn-primary" @click="create">{{
        t("create_template.create_button")
      }}
    </button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from "axios";
import {i18n} from "@/i18n";
import {ParameterType, ConstraintType} from "@/components/atoms/ParameterConsts";

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
        template_parameters: [],
      },
      errors: {
        template_name: ".",
        template_description:".",
        template_content: ".",
      },
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
      this.template.template_parameters.push(this.create_empty_parameter(data.type, this.template.template_parameters.length+1));
    });
    this.emitter.on('update:delete_parameter', (data) => {
      this.template.template_parameters.splice(data.index, 1)
    });
    this.emitter.on('update:parameter', (data) => {
      this.template.template_parameters[data.index] = data.parameter;
    });
    this.emitter.on('update:error', (data) => {
      this.errors[data.name] = data.value;
      this.is_error = null;
      if (!Object.values(this.errors).every(err => err === "")) {
        this.is_error = true;
      }
      console.log(this.errors);
    });
  },
  methods: {
    create() {
      let request = {}
      // TODO: validate
      request.template_name = this.template.template_name;
      request.template_description = this.template.template_description;
      request.template_content = this.template.template_content;
      request.template_parameters = []
      for(let param of this.template.template_parameters) {
        let request_parameter = {
          parameter_name: param.name,
          parameter_display_name: param.display_name,
          parameter_type: param.type,
          parameter_default_value: param.value.toString(),
        }
        switch (param.type) {
          case ParameterType.Int:
            request_parameter.parameter_constraints = [
              {type: ConstraintType.MinValue, value: param.min.toString()},
              {type: ConstraintType.MaxValue, value: param.max.toString()},
            ]
            break
          case ParameterType.Float:
            // TODO
            break
          case ParameterType.String:
            // TODO
            break
          case ParameterType.Bool:
            // TODO
            break
        }
        console.log(request_parameter)
        request.template_parameters.push(request_parameter);
      }

      console.log(request)

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized!");
        this.$router.push('/').then(() => {
          window.location.reload();
        });
      }

      axios.post(BACKEND_URL + '/template', request, {
        headers: {"Authorization": token}
      })
          .then(response => {
            const template_uuid = response.data.template_uuid;
            if (!template_uuid) {
              alert("Template ID missing from response!");
              this.$router.push('/').then(() => {
                window.location.reload();
              });
            }
            this.$router.push('/template/' + template_uuid).then(() => {
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
    create_empty_parameter(type, idx) {
      switch (type) {
        case ParameterType.Int:
          return {
            type: ParameterType.Int,
            name: "param"+idx,
            display_name: "Parameter Name",
            value: 5, min: 0, max: 10
          }
        case ParameterType.Float:
          return {
            type: ParameterType.Float,
            name: "param"+idx,
            display_name: "Parameter Name",
            value: 5.0, min: 0.0, max: 10.0, step: 0.5
          }
        case ParameterType.String:
          return {
            type: ParameterType.String,
            name: "param"+idx,
            display_name: "Parameter Name",
            value: "text", minLen: "3", maxLen: "10"
          }
        case ParameterType.Bool:
          return {
            type: ParameterType.Bool,
            name: "param"+idx,
            display_name: "Parameter Name",
            value: false
          }
      }
    }
  }
});

</script>