<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-6">
    {{ t('register.repeat_password') }}
  </div>
  <div class="col-6">
    <input type="password" v-model="repeat_password" @change="onUpdate">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'RepeatPasswordInput',
  data() {
    return {
      repeat_password: "",
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: "repeat_password", value: this.repeat_password});
    },
  }
});
</script>