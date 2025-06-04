<template>
  <UsernameInput/>
  <PasswordInput/>
</template>

<script>
import {defineComponent} from 'vue';
import UserNameInput from "@/components/atoms/UserNameInput.vue";
import PasswordInput from "@/components/atoms/PasswordInput.vue";

export default defineComponent({
  name: "LoginUserForm",
  components: {PasswordInput, UsernameInput: UserNameInput}
});
</script>