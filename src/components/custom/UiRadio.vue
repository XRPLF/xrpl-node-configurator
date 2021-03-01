<template>
  <label class="inline-flex items-center" :for="labelId">
    <span class="ml-1 text-gray-700">
    <input
      :id="labelId"
      :name="name"
      :checked="checked"
      :value="value"
      v-on="listeners"
      class="form-radio"
      type="radio">
    {{ this.label }}
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiRadio'
})
export default class UiRadio extends Vue {
  @Prop({ type: Boolean, required: true })
  checked!:boolean

  @Prop({ type: [String, Number, Boolean] })
  value!:string|number|boolean

  @Prop({ type: [String] })
  label!:string

  @Prop({ type: [String] })
  name!:string

  getRandomInt () {
    const min = 1
    const max = 1000000000
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  get labelId () {
    return `inputId${this.getRandomInt()}`
  }

  get listeners () {
    return {
      ...this.$listeners,
      change: (event: { target: { checked: any } }) => {
        this.$emit('radio-change', event.target.checked)
      }
    }
  }
}
</script>
