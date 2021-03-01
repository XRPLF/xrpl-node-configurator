<template>
  <component
    :is="$modal.context.componentName"
    :name="name"
    :classes="['vue-dialog', this.params.class]"
    :width="width"
    :data="data"
    :shift-y="0.3"
    :adaptive="true"
    :focus-trap="true"
    :clickToClose="clickToClose"
    :transition="transition"
    @before-open="beforeOpened"
    @before-close="beforeClosed"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
  >
    <div class="text-left vue-dialog-content clear">
      <div class="vue-dialog-content-title" v-if="params.title" v-html="params.title || ''" />
      <component v-if="params.component" v-bind="params.props" :is="params.component" />
      <div v-else v-html="params.text || ''" />
      <ul class="ml-2 p-2">
        <li v-for="item in data" :key="item" class="text-gray-900">
          <i class="fas fa-lightbulb text-orange-500"></i> {{ $t(`recommendations.${item}`) }}
        </li>
      </ul>
    </div>
    <div class="text-center mt-6">
      <button @click="ignore" class="inline-flex px-4 py-2 font-bold text-gray-800 bg-gray-300 border-b-4 border-gray-400 rounded hover:bg-gray-400 hover:border-gray-500">
        <span>{{ $t('modal.recommendations.ignore') }}</span>
      </button>

      <button @click="close" class="inline-flex px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-700 hover:border-blue-800">
        <span>{{ $t('modal.recommendations.fix') }}</span>
      </button>
    </div>
  </component>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiRecommendations'
})
export default class UiRecommendations extends Vue {
  params = {}

  @Prop({ type: [Number, String], default: 600 })
  width!:number|string

  @Prop({ type: Boolean, default: true })
  clickToClose!:boolean

  @Prop({ type: String })
  transition!:string

  @Prop({ type: Array })
  data!:Array<any>

  @Prop({ type: String })
  name!:string

  ignore () {
    this.$emit('ignore', true)
    this.$modal.hide(this.name)
  }

  close () {
    this.$modal.hide(this.name)
  }

  beforeOpened (event: { params: {} }) {
    this.params = event.params || {}
    this.$emit('before-opened', event)
  }

  beforeClosed (event: any) {
    this.params = {}
    this.$emit('before-closed', event)
  }
}
</script>
