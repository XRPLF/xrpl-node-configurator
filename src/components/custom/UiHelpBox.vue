<template>
  <div>
    <h3>
      <i class="fas fa-info-circle text-blue-500"></i>
      {{ $t('helpBox.title') }}
    </h3>
    <div class="mt-2 bg-gray-200 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div class="flex-1 pl-1" v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import axios from 'axios'
import i18n from '../../i18n'

@Component({
  name: 'UIHelpBox'
})
export default class UIHelpBox extends Vue {
  content = null

  @Prop({ type: String, required: false })
  contentKey!: string

  @Watch('contentKey')
  contentKeyChange (newVal: string) {
    axios.get(`content/html/${newVal}_${i18n.locale}.html`).then(response => {
      this.content = response.data
    })
      .catch(error => {
        this.content = error
      })
  }
}
</script>
