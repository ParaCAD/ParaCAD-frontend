<script setup>
import {ParameterType} from "@/components/atoms/ParameterConsts";
import CreateTemplateValidationError from "@/components/atoms/CreateTemplateValidationError.vue";

</script>

<template>
  <div class="param_row row gy-1 border border-black rounded align-middle"
       :class="{'error_param_row':validation_error}">
    <div class="col-2 align-middle">
      {{ index + 1 }}
      <span class="badge text-bg-secondary text-bg-success">{{ typeSymbol }}</span>
      <input class="parameter_name_input" type="text" v-model="parameter.name" @change="updateParameter"/>
    </div>
    <div class="col-2">
      <input class="parameter_display_name_input" type="text" v-model="parameter.display_name"
             @change="updateParameter"/>
    </div>
    <div class="col-7">
      <div v-if="parameter.type===ParameterType.Int">
        Val:<input class="param_field_int" type="number" step="1" v-model="parameter.value"
                   @change="updateParameter" required/>
        Min:<input class="param_field_int" type="number" step="1" v-model="parameter.min"
                   @change="updateParameter" required/>
        Max:<input class="param_field_int" type="number" step="1" v-model="parameter.max"
                   @change="updateParameter" required/>
      </div>
      <div v-else-if="parameter.type===ParameterType.Float">
        Val:<input class="param_field_float" type="number" step="0.0001" v-model="parameter.value"
                   @change="updateParameter" required/>
        Min:<input class="param_field_float" type="number" step="0.0001" v-model="parameter.min"
                   @change="updateParameter" required/>
        Max:<input class="param_field_float" type="number" step="0.0001" v-model="parameter.max"
                   @change="updateParameter" required/>
        Step:<input class="param_field_float" type="number" step="0.0001" v-model="parameter.step"
                    @change="updateParameter" required/>
      </div>
      <div v-else-if="parameter.type===ParameterType.String">
        Val:<input class="param_field_string" type="text" step="0.0001" v-model="parameter.value"
                   @change="updateParameter" required/>
        MinLen:<input class="param_field_string" type="number" step="1" v-model="parameter.minLen"
                   @change="updateParameter" required/>
        MaxLen:<input class="param_field_string" type="number" step="1" v-model="parameter.maxLen"
                   @change="updateParameter" required/>
      </div>
      <div v-else-if="parameter.type===ParameterType.Bool">
        Val:<input class="param_field_bool" type="checkbox" v-model="parameter.value"
                   @change="updateParameter" required/>
      </div>
    </div>
    <div class="col-1">
      <button class="button_delete btn btn-danger"
              @click="deleteParameter">
        x
      </button>
    </div>
    <CreateTemplateValidationError :err="validation_error"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {ParameterType} from "@/components/atoms/ParameterConsts";

export default defineComponent({
  name: "CreateTemplateParameter",
  computed: {},
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
      typeSymbol: typeSymbol,
      validation_error: "",
    }
  },
  methods: {
    updateParameter() {
      this.validation_error = ""
      switch (this.parameter.type) {
        case ParameterType.Int:
          if (this.parameter.min >= this.parameter.max) {
            this.validation_error = "Maximum must be greater than minimum";
          }
          if (this.parameter.value < this.parameter.min) {
            this.validation_error = "Value less than min"
          } else if (this.parameter.value > this.parameter.max) {
            this.validation_error = "Value more than max"
          }
          break
        case ParameterType.Float:
          if (this.parameter.min >= this.parameter.max) {
            this.validation_error = "Maximum must be greater than minimum";
          }
          if (this.parameter.value < this.parameter.min) {
            this.validation_error = "Value less than min"
          } else if (this.parameter.value > this.parameter.max) {
            this.validation_error = "Value more than max"
          }
          if (this.parameter.step <= 0) {
            this.validation_error = "Step must be greater than 0";
          }
          break
        case ParameterType.String:
          if (this.parameter.minLen >= this.parameter.maxLen) {
            this.validation_error = "Maximum length must be greater than minimum length";
          }
          if (this.parameter.value.length < this.parameter.minLen) {
            this.validation_error = "Value length less than min"
          } else if (this.parameter.value.length > this.parameter.maxLen) {
            this.validation_error = "Value length more than max"
          }
          break
        case ParameterType.Bool:
          break
      }
      this.emitter.emit("update:error", {name: "param" + this.index, value: this.validation_error});
      this.emitter.emit("update:parameter", {index: this.index, parameter: this.parameter});
    },
    deleteParameter() {
      this.emitter.emit("update:error", {name: "param" + this.index, value: ""});
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

.error_param_row {
  height: 110px;
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

.parameter_name_input {
  width: 60%;
  margin-left: 10px;
}

.param_field_int {
  width: 25%;
}

.param_field_float {
  width: 15%;
}

.param_field_string{
  width: 20%;
}
</style>