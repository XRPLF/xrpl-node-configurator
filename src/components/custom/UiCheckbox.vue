<template>
  <label class="inline-flex items-center" :for="id">
    <span class="ml-1 text-gray-700">
    <input
      :id="id"
      :name="name"
      :checked="checked"
      :value="value"
      :disabled="disabled"
      v-on="listeners"
      class="form-checkbox"
      type="checkbox">
    {{ this.label }}
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiCheckbox'
})
export default class UiCheckbox extends Vue {
  @Prop({ required: true, type: Boolean })
  checked!:boolean

  @Prop({ required: true, type: [String, Number, Boolean] })
  value!: string|number|boolean

  @Prop({ type: String })
  label!:string

  @Prop({ type: String })
  name!:string

  @Prop({ type: String })
  id!:string

  @Prop({ type: Boolean })
  disabled!:boolean

  getRandomInt () {
    const min = 1
    const max = 1000000000
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  get listeners () {
    return {
      ...this.$listeners,
      change: (event: { target: { checked: boolean } }) => {
        this.$emit('checkbox-change', event.target.checked)
      }
    }
  }
}
</script>
