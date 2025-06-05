<template>
  <div class="container w-75">
    <div class="row gy-1">
      <TemplateNameInput/>
      <TemplateDescriptionInput/>
      <TemplateContentInput/>
<!--    TODO: input preview-->
<!--    TODO: input parameters-->
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ParameterInputField from '../molecules/ParameterInputField.vue';
import TemplateNameInput from "@/components/atoms/TemplateNameInput.vue";
import TemplateContentInput from "@/components/atoms/TemplateContentInput.vue";
import TemplateDescriptionInput from "@/components/atoms/TemplateDescriptionInput.vue";

export default defineComponent({
  name: "CreateTemplateForm",
  props: {},
  methods: {},
  components: {TemplateDescriptionInput, TemplateContentInput, TemplateNameInput}
});
</script>