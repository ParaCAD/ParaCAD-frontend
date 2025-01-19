<template>
  {{ template.template_name }}
  {{ template.template_parameters }}
  <ModelForm :parameters="template.template_parameters"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ModelForm from '@/components/organisms/ModelForm.vue';

interface GetTemplateResponse {
  template_uuid: string;
  template_name: string;
  template_description: string;
  template_preview: string;
  template_parameters: ParameterWithValidation[];

  owner_uuid: string;
  owner_name: string;
}

interface ParameterWithValidation {
  parameter_display_name: string;
  parameter_name: string;
  parameter_type: string;
  parameter_default_value: string;
  parameter_constraints: GetTemplateResponseParameterConstrain[];
}

interface GetTemplateResponseParameterConstrain{
  type: string;
  value: string;
}

export default defineComponent({
  name: "TemplatePage",
  props: {
  },
  data() {
    return {
      template: ref<GetTemplateResponse>({
        template_uuid: '',
        template_name: '',
        template_description: '',
        template_preview: '',
        template_parameters: [],
        owner_uuid: '',
        owner_name: ''
      })
    };
  },
  setup(props) {
    return {
    };
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
        this.template = <GetTemplateResponse>data;
        console.log(data.template_parameters);
      })
  },
  methods: {
  },
  components: { ModelForm }
});

</script>