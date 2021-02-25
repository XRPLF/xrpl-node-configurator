<template>
  <div>
    <select v-model="selected" v-on="listeners" @change="select($event)" @mouseover="over($event)" class="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :id="id">
      <option v-on="listeners" v-for="option in options" :key="option.id" :value="option.value">{{ option.name }}</option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
      <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiDropdown'
})
export default class UiDropdown extends Vue {
  @Prop({ type: Array, required: true })
  options!: Array<string>

  @Prop({ type: String, required: true })
  id!: string

  @Prop({ type: String, required: true })
  selected!: string

  select (event: { target: { value: string } }) {
    this.selected = event.target.value
    this.$emit('item-select', this.selected)
  }

  over (event: { target: { value: string } }) {
    this.selected = event.target.value
    this.$emit('item-over', this.selected)
  }
  
  get listeners () {
    return {
      ...this.$listeners,
      change: (event: string) => {
        this.$emit('dropdown-change', this.selected)
      }
    }
  }
}
</script>
