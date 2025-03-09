<template>
  {{ template.template_name }}
  <ModelForm :parameters="template.template_parameters"/>
  <button @click="debugClick">Debug</button>
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
    console.log('TemplateUUID: ', templateUUID);
    const uuidRegExp = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "i")
    console.log(uuidRegExp)
    console.log('match: ', uuidRegExp.test(templateUUID));
    if (!uuidRegExp.test(templateUUID)) {
      this.$router.push({path:"/"})
      alert("Nieprawidłowy UUID")
      return;
    }

    axios.get('http://localhost:8081/template/'+templateUUID)
        .then(response => {
          this.template = response.data;
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
    debugClick() {
      let request = {"parameters": []}
      for (let [key, value] of Object.entries(this.values)) {
        request.parameters.push({
          "parameter_name": key,
          "parameter_value": value.toString()
        })
      }

      axios.post('http://localhost:8081/template/00000000-0000-0000-0000-000000000000/model', request)
          .then(response => {
            const decodedData = atob(response.data);
            const uInt8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; ++i) {
              uInt8Array[i] = decodedData.charCodeAt(i);
            }
            let blob = new Blob([uInt8Array], {type: "application/octet-stream"});
            this.download(blob, "model.stl");
          }).catch(error => {
        console.error(error);
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