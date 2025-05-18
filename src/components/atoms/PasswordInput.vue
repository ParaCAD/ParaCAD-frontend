<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-6">
    {{ t('register.password') }}
  </div>
  <div class="col-6">
    <input type="password" v-model="password" @change="onUpdate">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PasswordInput',
  data() {
    return {
      password: "",
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: "password", value: this.password});
    },
  }
});
</script>