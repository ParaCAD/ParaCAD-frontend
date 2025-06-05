<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_name') }}
  </div>
  <div class="col-9">
    <input class="template_name_input_text" type="text" v-model="template_name" @change="onUpdate">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TemplateNameInput',
  data() {
    return {
      template_name: "",
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: "template_name", value: this.template_name});
    },
  }
});
</script>

<style>
.template_name_input_text{
  width: 100%;
}
</style>