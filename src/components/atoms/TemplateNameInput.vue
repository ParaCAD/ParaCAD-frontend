<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-6">
    {{ t('create_template.template_name') }}
  </div>
  <div class="col-6">
    <input type="text" v-model="template_name" @change="onUpdate">
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