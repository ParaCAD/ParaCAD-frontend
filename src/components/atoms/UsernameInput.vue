<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
  <div class="col-6">
    {{ t('register.username') }}
  </div>
  <div class="col-6">
    <input type="text" v-model="username" @change="onUpdate">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'UsernameInput',
  data() {
    return {
      username: "",
    }
  },
  methods: {
    onUpdate() {
      this.emitter.emit("update:field", {name: "username", value: this.username});
    },
  }
});
</script>