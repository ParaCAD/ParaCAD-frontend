<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateValidationError from "@/components/atoms/createTemplateInput/CreateTemplateValidationError.vue";

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_content') }}
  </div>
  <div class="col-9">
    <textarea class="template_content_textarea" v-model="template_content" @change="onUpdate"></textarea>
  </div>

  <CreateTemplateValidationError :err="validation_error"/>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TemplateContentInput',
  data() {
    return {
      template_content: "",
      validation_error: "",
    }
  },
  methods: {
    onUpdate() {
      this.validation_error = ""
      if (this.template_content.length < 5){
        this.validation_error = "Template content must be at least 5 characters"
      }
      if (this.template_content.length > 10000){
        this.validation_error = "Template content must be at max 10000 characters"
      }
      if (this.validation_error !== ""){
        this.emitter.emit("update:error", {name: "template_content", value: this.validation_error});
        return;
      }
      this.emitter.emit("update:error", {name: "template_content", value: ""});
      this.emitter.emit("update:field", {name: "template_content", value: this.template_content});
    },
  }
});
</script>

<style>
.template_content_textarea{
  overflow: scroll;
  white-space: nowrap;
  height: 150px;
  min-height: 150px;
  max-height: 500px;
  width: 100%;
}
</style>