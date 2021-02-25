<template>
  <component
    :is="$modal.context.componentName"
    :classes="['vue-dialog', this.params.class]"
    :name="name"
    :width="width"
    :message="message"
    :shift-y="0.3"
    :adaptive="true"
    :focus-trap="true"
    :clickToClose="clickToClose"
    :transition="transition"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
  >
    <div class="text-left vue-dialog-content clear">
      <div class="vue-dialog-content-title">
        <i class="fas fa-exclamation-triangle text-green-500"></i>
        {{ title }}
      </div>
      <div>{{ message }}</div>
    </div>
    <div class="text-center mt-6">
      <button @click="close" class="inline-flex px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-700 hover:border-blue-800">
        <span>{{ $t('modal.close') }}</span>
      </button>
    </div>
  </component>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiSuccessPopup'
})
export default class UiSuccessPopup extends Vue {
  params = {}

  @Prop({ type: [Number, String], default: 600 })
  width!: number|string

  @Prop({ type: Boolean, default: true })
  clickToClose!: boolean

  @Prop({ type: String })
  transition!: string

  @Prop({ type: String })
  name!: string

  @Prop({ type: String })
  title!: string

  @Prop({ type: String })
  message!: string

  close (event: any) {
    this.$modal.hide(this.name)
  }
}
</script>
