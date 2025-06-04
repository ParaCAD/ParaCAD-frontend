<template>
  <div class="container w-50 ModelForm mt-2 mb-2">
    <div class="container w-50 mt-2 mb-2">
      <div class="row gy-1">
    <TemplateNameInput/>
<!--    TODO: input description-->
<!--    TODO: input preview-->
<!--    TODO: input parameters-->
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ParameterInputField from '../molecules/ParameterInputField.vue';
import TemplateNameInput from "@/components/atoms/TemplateNameInput.vue";

export default defineComponent({
  name: "CreateTemplateForm",
  props: {},
  methods: {},
  components: {TemplateNameInput}
});
</script>