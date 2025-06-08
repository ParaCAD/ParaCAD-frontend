<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateValidationError from "@/components/atoms/CreateTemplateValidationError.vue";

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_description') }}
  </div>
  <div class="col-9">
    <textarea maxlength="1000" class="template_description_textarea" v-model="template_description" @change="onUpdate"></textarea>
  </div>

  <CreateTemplateValidationError :err="validation_error"/>
</template>

<script>
import {defineComponent} from 'vue';
import {i18n} from "@/i18n";

const {t} = i18n.global

export default defineComponent({
  name: 'TemplateDescriptionInput',
  created() {
    this.emitter.emit("update:error", {name: "template_description", value: "."});
  },
  data() {
    return {
      template_description: "",
      validation_error: ""
    }
  },
  methods: {
    onUpdate() {
      this.validation_error = ""
      if (this.template_description.length < 10){
        this.validation_error = t('create_template.error.too_short',{name:t('create_template.template_description'),value:10})
      }
      if (this.template_description.length > 1000){
        this.validation_error = t('create_template.error.too_long',{name:t('create_template.template_description'),value:1000})
      }
      if (this.validation_error !== ""){
        this.emitter.emit("update:error", {name: "template_description", value: this.validation_error});
        return;
      }
      this.emitter.emit("update:error", {name: "template_description", value: ""});
      this.emitter.emit("update:field", {name: "template_description", value: this.template_description});
    },
  }
});
</script>

<style>
.template_description_textarea{
  overflow: scroll;
  white-space: nowrap;
  height: 150px;
  min-height: 150px;
  max-height: 500px;
  width: 100%;
}
</style>