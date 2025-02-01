<template>
  <div class="template-page-test">
    <img alt="Vue logo" src="@/assets/logo.png">
  </div>
  {{ template.template_name }}
  <ModelForm :parameters="template.template_parameters" v-model="values"/>
  <button @click="debugClick">Debug</button>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import ModelForm from '@/components/organisms/ModelForm.vue';
import ParameterWithValidation from '@/components/molecules/ParameterInputField.vue';
import ParameterInputField from "@/components/molecules/ParameterInputField.vue";

interface GetTemplateResponse {
  template_uuid: string;
  template_name: string;
  template_description: string;
  template_preview: string;
  template_parameters: typeof ParameterWithValidation[];

  owner_uuid: string;
  owner_name: string;
}


export default defineComponent({
  name: "TemplatePage",
  props: {},
  data() {
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
      values: {} as { [index: string]: any },
    };
  },
  setup(props) {
    return {};
  },
  created() {
    fetch('http://localhost:8081/template/00000000-0000-0000-0000-000000000000')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.template = data;
          for (let parameter of this.template.template_parameters as typeof ParameterWithValidation[]) {
            console.log("template page " + parameter.parameter_name);
            this.values[parameter.parameter_name] = parameter.parameter_default_value;
          }
          console.log(this.template);
        })
  },
  methods: {
    debugClick() {
      let valString = ""
      for (let [key, value] of Object.entries(this.values)) {
        valString += key + "=" + value + "; ";
      }
      console.log(valString);
    }
  },
  components: {ModelForm}
});

</script>