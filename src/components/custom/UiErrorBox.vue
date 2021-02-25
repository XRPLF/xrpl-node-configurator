<template>
  <div v-if="display" class="relative float-right w-128 pl-4 pr-8 mr-4 text-yellow-900 bg-yellow-200 border border-yellow-300 rounded" role="alert">
    <strong class="font-bold">Brbrbr!</strong>
    <span class="block sm:inline">{{ $t('errors.validation') }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiErrorBox'
})
export default class UiErrorBox extends Vue {
  @Prop({ type: Boolean, required: true })
  display!: boolean
}
</script>
