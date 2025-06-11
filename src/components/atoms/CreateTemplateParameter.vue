<template>
  <div class="param_row row gy-1 border border-black rounded m-2 p-1 align-middle">
    <div class="col-1">
      {{ index + 1 }}
    </div>
    <div class="col-2">
      displayname
    </div>
    <div class="col-2">
      name
    </div>
    <div v-if="parameter.type==='int'" class="col-6">
      TODO: int fields
    </div>
    <div v-else-if="parameter.type==='float'" class="col-6">
      TODO: float fields
    </div>
    <div v-else-if="parameter.type==='string'" class="col-6">
      TODO: string fields
    </div>
    <div v-else-if="parameter.type==='bool'" class="col-6">
    TODO: bool fields
    </div>
    <div class="col-1">
      <button class="button_delete btn btn-danger"
              @click="deleteParameter(index)">
        x
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {ParameterType} from "@/components/atoms/ParameterConsts";

export default defineComponent({
  name: "CreateTemplateParameter",
  computed: {
    ParameterType() {
      return ParameterType
    }
  },
  props: {
    parameter: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteParameter(index) {
      this.emitter.emit("update:delete_parameter", {index: index});
    }
  },
  components: {}
});
</script>

<style>
.param_row {
  height: 40px;
}
.button_delete {
  width: 25px;
  height: 25px;
  font-size: 15px;
  padding: 0;
  text-align: center;

}
</style>