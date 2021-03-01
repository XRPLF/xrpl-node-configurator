<template>
  <div @mouseenter="focus()" class="hover:bg-teal-100 pl-4 pr-4 py-2" :class="additionalClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiStepSection'
})
export default class UiStepSection extends Vue {
  @Prop({ type: String, required: false })
  additionalClasses!:string

  @Prop({ type: String, required: true })
  helpBox!:string

  focus () {
    this.$emit('item-focus', this.helpBox)
  }
}
</script>
