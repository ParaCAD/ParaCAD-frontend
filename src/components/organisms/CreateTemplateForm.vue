<template>
  <div class="container w-75">
    <div class="row gy-1">
      <TemplateNameInput/>
      <TemplateDescriptionInput/>
      <TemplateContentInput/>
<!--    TODO: consider custom preview upload-->
      <CreateTemplateParametersInput :parameters="parameters"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import TemplateNameInput from "@/components/molecules/createTemplateInput/TemplateNameInput.vue";
import TemplateContentInput from "@/components/molecules/createTemplateInput/TemplateContentInput.vue";
import TemplateDescriptionInput from "@/components/molecules/createTemplateInput/TemplateDescriptionInput.vue";
import CreateTemplateParametersList
  from "@/components/molecules/createTemplateInput/CreateTemplateParametersList.vue";

export default defineComponent({
  name: "CreateTemplateForm",
  props: {
    parameters:{
      type: Array,
      required: true
    }
  },
  methods: {},
  components: {CreateTemplateParametersInput: CreateTemplateParametersList, TemplateDescriptionInput, TemplateContentInput, TemplateNameInput}
});
</script>