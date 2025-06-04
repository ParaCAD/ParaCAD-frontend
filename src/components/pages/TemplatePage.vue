<script setup>
import {useI18n} from 'vue-i18n'
import ModelDescription from "@/components/atoms/ModelDescription.vue";

const {t} = useI18n()
</script>

<template>
  <div class="container w-50">
  <img class="img-fluid rounded w-50" :src="template.template_preview" alt="Generated model preview"/>
  <h2 class="mt-2">
    {{ template.template_name }}
    <br/>
    ({{ t("template.created_by") }}
    <a :href="/user/+template.owner_uuid">
      {{ template.owner_name }})
    </a>
  </h2>
  <ModelDescription :description="template.template_description"/>
  <ModelForm :parameters="template.template_parameters"/>
  <button class="btn btn-primary" @click="generate">{{ t("template.generate_button") }}</button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import ModelForm from '@/components/organisms/ModelForm.vue';

export default defineComponent({
  name: "TemplatePage",
  props: {},
  data() {
    return {
      template: {
        template_uuid: '',
        template_name: '',
        template_description: '',
        template_preview: '',
        template_parameters: [],
        owner_uuid: '',
        owner_name: ''
      },
      values: {},
    };
  },
  setup(props) {
    return {};
  },
  created() {
    const templateUUID = this.$route.params.templateUUID.trim()
    const uuidRegExp = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i")
    if (!uuidRegExp.test(templateUUID)) {
      this.$router.push({path: "/"})
      alert("Nieprawidłowy UUID")
      return;
    }

    axios.get(BACKEND_URL + '/template/' + templateUUID)
        .then(response => {
          this.template = response.data;
          this.template.template_preview = BACKEND_URL + '/image/' + this.template.template_preview;
          for (let parameter of this.template.template_parameters) {
            this.values[parameter.parameter_name] = parameter.parameter_default_value;
          }
        })
        .catch(error => {
          console.error(error);
        })
  },
  mounted() {
    this.emitter.on('update:field', (data) => {
      this.values[data.name] = data.value;
    });
  },
  methods: {
    generate() {
      let request = {"parameters": []}
      // TODO: validate
      for (let [key, value] of Object.entries(this.values)) {
        request.parameters.push({
          "parameter_name": key,
          "parameter_value": value.toString()
        })
      }

      axios.post(BACKEND_URL + '/template/' + this.template.template_uuid + '/model', request)
          .then(response => {
            const decodedData = atob(response.data);
            const uInt8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; ++i) {
              uInt8Array[i] = decodedData.charCodeAt(i);
            }
            let blob = new Blob([uInt8Array], {type: "application/octet-stream"});
            this.download(blob, this.template.template_name + ".stl");
          }).catch(error => {
        console.error(error);
        alert(error.response.data);
      })
    },
    download(file, filename) {
      if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
  components: {ModelForm}
});

</script>

<style>
</style>