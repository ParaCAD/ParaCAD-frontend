<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_content') }}
  </div>
  <div class="col-9">
    <textarea class="template_content_textarea" v-model="template_content" @change="onUpdate"></textarea>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TemplateContentInput',
  data() {
    return {
      template_content: "",
    }
  },
  methods: {
    onUpdate() {
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