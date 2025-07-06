<script setup>
import {useI18n} from 'vue-i18n'
import CreateTemplateValidationError from "@/components/atoms/CreateTemplateValidationError.vue";

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_name') }}
  </div>
  <div class="col-9">
    <input class="template_name_input_text" type="text" v-model="template_name" @change="onUpdate">
  </div>

  <CreateTemplateValidationError :err="validation_error"/>
</template>

<script>
import {defineComponent} from 'vue';
import {i18n} from "@/i18n";

const {t} = i18n.global

export default defineComponent({
  name: 'TemplateNameInput',
  created() {
    this.emitter.emit("update:error", {name: "template_name", value: "."});
  },
  data() {
    return {
      template_name: "",
      validation_error: ""
    }
  },
  methods: {
    onUpdate() {
      this.validation_error = ""
      if (this.template_name.length < 5) {
        this.validation_error = t('create_template.error.too_short', {
          name: t('create_template.template_name'),
          value: 5
        })
      }
      if (this.template_name.length > 100) {
        this.validation_error = t('create_template.error.too_long', {
          name: t('create_template.template_name'),
          value: 100
        })
      }
      if (this.validation_error !== "") {
        this.emitter.emit("update:error", {name: "template_name", value: this.validation_error});
        return;
      }
      this.emitter.emit("update:error", {name: "template_name", value: ""});
      this.emitter.emit("update:field", {name: "template_name", value: this.template_name});
    },
  }
});
</script>

<style>
.template_name_input_text {
  width: 100%;
}
</style>