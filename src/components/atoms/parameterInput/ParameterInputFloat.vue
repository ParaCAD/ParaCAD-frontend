<template>
  <div class="col-6">
    <label class="col-form-label" :for="parameter.name">{{ parameter.displayName }}</label>
  </div>
  <div class="col-6">
  <input :id="parameter.name" ref="field" type="number" :name="parameter.name" :min="parameter.min" :max="parameter.max" :step="parameter.step"
           class="form-control" v-model="value" @change="onUpdate" required/>
    <TemplateValidationError :err="validation_error"/>
  </div>

</template>

<script>
import {defineComponent} from 'vue';
import {i18n} from "@/i18n";
import TemplateValidationError from "@/components/atoms/TemplateValidationError.vue";

const {t} = i18n.global

export default defineComponent({
  name: 'ParameterInputFloat',
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
      this.validation_error = ""
      if (this.value < this.parameter.min) {
        this.validation_error = t('template.error.too_small',{min: this.parameter.min});
      }
      if (this.value > this.parameter.max){
        this.validation_error = t('template.error.too_large',{max: this.parameter.max});
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