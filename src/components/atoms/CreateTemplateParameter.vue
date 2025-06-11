<script setup>
import {ParameterType} from "@/components/atoms/ParameterConsts";

</script>

<template>
  <div class="param_row row gy-1 border border-black rounded align-middle">
    <div class="col-1 align-middle">
      <div>
        {{ index + 1 }}
        <span class="badge text-bg-secondary text-bg-success">{{ typeSymbol }}</span>
      </div>
    </div>
    <div class="col-2">
      <input class="parameter_display_name_input" type="text" v-model="parameter.display_name" @change="updateParameter"/>
    </div>
    <div class="col-2">
      <input class="parameter_name_input" type="text" v-model="parameter.name" @change="updateParameter"/>
    </div>
    <div v-if="parameter.type===ParameterType.Int" class="col-6">
      TODO: int fields
    </div>
    <div v-else-if="parameter.type===ParameterType.Float" class="col-6">
      TODO: float fields
    </div>
    <div v-else-if="parameter.type===ParameterType.String" class="col-6">
      TODO: string fields
    </div>
    <div v-else-if="parameter.type===ParameterType.Bool" class="col-6">
    TODO: bool fields
    </div>
    <div class="col-1">
      <button class="button_delete btn btn-danger"
              @click="deleteParameter">
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
  data() {
    let typeSymbol = "a"
    switch (this.parameter.type) {
      case ParameterType.Int:
        typeSymbol = "I"
        break
      case ParameterType.Float:
        typeSymbol = "F"
        break
      case ParameterType.String:
        typeSymbol = "S"
        break
      case ParameterType.Bool:
        typeSymbol = "B"
        break
    }
    return {
      typeSymbol: typeSymbol
    }
  },
  methods: {
    updateParameter() {
      this.emitter.emit("update:parameter", {index: this.index, parameter: this.parameter});
    },
    deleteParameter() {
      this.emitter.emit("update:delete_parameter", {index: this.index});
    }
  },
  components: {}
});
</script>

<style>
.param_row {
  height: 40px;
  margin-bottom: 10px;
}
.button_delete {
  width: 25px;
  height: 25px;
  font-size: 15px;
  padding: 0;
  text-align: center;
}
.parameter_display_name_input {
  width: 100%;
}
.parameter_name_input{
  width: 100%;
}
</style>