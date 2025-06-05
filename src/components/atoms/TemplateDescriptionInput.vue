<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-3">
    {{ t('create_template.template_description') }}
  </div>
  <div class="col-9">
    <textarea maxlength="1000" class="template_description_textarea" v-model="template_description" @change="onUpdate"></textarea>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TemplateDescriptionInput',
  data() {
    return {
      template_description: "",
    }
  },
  methods: {
    onUpdate() {
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