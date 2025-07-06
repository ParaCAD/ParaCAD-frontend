<script setup>
import {ParameterType} from "@/components/atoms/ParameterConsts";
import CreateTemplateParameter from "@/components/atoms/CreateTemplateParameter.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
</script>

<template>
  <div class="container p-2 text-center">
    <div v-for="(parameter, index) in parameters">
      <CreateTemplateParameter :index="index" :parameter="parameter"/>
    </div>
    <div class="row gy-1">
      <div class="col-3">
        <button class="add_param btn btn-success" @click="addParameter(ParameterType.Int)">
          {{ t('create_template.parameters.integer') }}
        </button>
      </div>
      <div class="col-3">
        <button class="add_param btn btn-success" @click="addParameter(ParameterType.Float)">
          {{ t('create_template.parameters.float') }}
        </button>
      </div>
      <div class="col-3">
        <button class="add_param btn btn-success" @click="addParameter(ParameterType.String)">
          {{ t('create_template.parameters.string') }}
        </button>
      </div>
      <div class="col-3">
        <button class="add_param btn btn-success" @click="addParameter(ParameterType.Bool)">
          {{ t('create_template.parameters.bool') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CreateTemplateParametersList",
  props: {
    parameters: {
      type: Array,
      required: true
    }
  },
  methods: {
    addParameter(type) {
      this.emitter.emit("update:add_parameter", {type: type});
    }
  },
  components: {}
});

</script>

<style>
.add_param {
  width: 100%;
}
</style>