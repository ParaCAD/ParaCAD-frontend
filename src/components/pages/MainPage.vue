<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <h1>ParaCAD</h1>
  {{ t("main.content") }}
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "MainPage",
  props: {},
  data() {
    return {};
  },
  setup() {
    return {};
  },
});

</script>