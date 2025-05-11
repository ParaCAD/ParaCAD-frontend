<template>
  <div class="user-widget d-flex text-center">
    <p v-if="is_guest">
      Log in
    </p>
    <p v-else>
      Logged in as <br/> {{ username }}
    </p>
  </div>
</template>

<script>
import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'UserWidget',
  props: {
    username: {
      type: String,
      required: false
    }
  },
  data() {
    const is_guest = computed(() => {
      if (this.username) {
        console.log(this.username);
        return this.username.length === 0
      }
      return true
    })
    return {is_guest}
  }
})
</script>

<style>
.user-widget {
  width: 100px;
  height: 50px;
}
</style>