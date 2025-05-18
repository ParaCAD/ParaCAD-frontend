<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-6">
    {{ t('register.email') }}
  </div>
  <div class="col-6">
    <input type="email" v-model="email" @change="onUpdate">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'EmailInput',
  data() {
    return {
      email: "",
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: "email", value: this.email});
    },
  }
});
</script>