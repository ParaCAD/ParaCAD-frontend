<template>
  <UsernameInput/>
  <PasswordInput/>
</template>

<script>
import {defineComponent} from 'vue';
import UsernameInput from "@/components/atoms/UsernameInput.vue";
import PasswordInput from "@/components/atoms/PasswordInput.vue";

export default defineComponent({
  name: "LoginUserForm",
  components: {PasswordInput, UsernameInput}
});
</script>