<template>
  <UsernameInput/>
  <EmailInput/>
  <PasswordInput/>
  <RepeatPasswordInput/>
</template>

<script>
import {defineComponent} from 'vue';
import UserNameInput from "@/components/atoms/UserNameInput.vue";
import PasswordInput from "@/components/atoms/PasswordInput.vue";
import EmailInput from "@/components/atoms/EmailInput.vue";
import RegisterPage from "@/components/pages/RegisterPage.vue";
import RepeatPasswordInput from "@/components/atoms/RepeatPasswordInput.vue";

export default defineComponent({
  name: "RegisterUserForm",
  components: {RepeatPasswordInput, RegisterPage, EmailInput, PasswordInput, UsernameInput: UserNameInput}
});
</script>