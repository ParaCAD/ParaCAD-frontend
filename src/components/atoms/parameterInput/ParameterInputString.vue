<template>
  <div class="col-6">
    <label class="col-form-label" :for="parameter.name">{{ parameter.displayName }}</label>
  </div>
  <div class="col-6">
    <input :id="parameter.name" ref="field" type="text" :name="parameter.name" :minlength="parameter.minLen" :maxlength="parameter.maxLen"
           class="form-control" v-model="value" @change="onUpdate"/>
    <TemplateValidationError :err="validation_error"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import TemplateValidationError from "@/components/atoms/TemplateValidationError.vue";
import {i18n} from "@/i18n";

const {t} = i18n.global

export default defineComponent({
  name: 'ParameterInputString',
  components: {TemplateValidationError},
  props: {
    parameter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: this.parameter.default,
      validation_error: "",
    }
  },
  methods: {
    onUpdate() {
      this.value = this.value.trim()
      this.validation_error = ""
      if (this.value.length < this.parameter.minLen) {
        this.validation_error = t('template.error.too_short',{min: this.parameter.minLen});
      }
      if (this.value.length > this.parameter.maxLen){
        this.validation_error = t('template.error.too_long',{max: this.parameter.maxLen});
      }
      if (this.validation_error !== ""){
        this.emitter.emit("update:error", {name: this.parameter.name, value: this.validation_error});
        return;
      }
      this.emitter.emit("update:error", {name: this.parameter.name, value: ""});
      this.emitter.emit("update:field", {name: this.parameter.name, value: this.value});
    },
  }
});
</script>