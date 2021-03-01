<template>
  <div>
    <select multiple="true" v-model="selected" v-on="listeners" @change="select($event)" :id="id" class="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 h-16" :class="(this.error) ? 'bg-yellow-200 border-yellow-300' : 'bg-gray-200 border-gray-200'">
      <option v-on="listeners" v-for="option in options" :key="option.id" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiMultiSelect'
})
export default class UiMultiSelect extends Vue {
  @Prop({ type: [Array], required: true })
  options!:Array<any>

  @Prop({ type: [String], required: true })
  id!:string

  @Prop({ type: [Array], required: false })
  selected!:Array<string>

  @Prop({ type: Boolean, required: false })
  error!:boolean
  
  select (event: { target: { selectedOptions: Iterable<unknown>|ArrayLike<unknown> } }) {
    const selectedOptions: any[] = []
    Array.from(event.target.selectedOptions).forEach((item:any) => {
      selectedOptions.push(item.value)
    })
    this.selected = selectedOptions
    this.$emit('multiselect-item-select', this.selected)
  }
  
  get listeners () {
    return {
      ...this.$listeners,
      change: (event: any) => {
        this.$emit('multiselect-change', this.selected)
      }
    }
  }
}
</script>
