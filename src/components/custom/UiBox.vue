<template>
  <div :id="contentId.replace('.','_')">
    <div :class="'arrow-' + arrow + ' ' + arrow + '-' + type" class="border-yellow-100 ml-6 mt-1"></div>
    <div :class="type + '-arrow ' + typeClass" class="p-2 items-center leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <div class="py-1 pl-2 mr-2" v-if="icon">
        <i :class="'fas fa-' + iconClass"></i>
      </div>
      <span class="mr-2 text-left flex-auto">{{ $t(contentId) }}</span>
    </div>
  </div>
</template>

<style scoped>
.left-arrow {
  margin-left:-4px
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

.up-info {
  border-bottom: 8px solid #EBF8FF;
}

.left-info {
  border-right:10px solid #EBF8FF;
}

.up-warning {
  border-bottom: 8px solid #FFFAF0;
}

.left-warning {
  border-right:10px solid #FFFAF0;
}

.arrow-left {
  float: left;
  margin-top: 10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'UiBox'
})
export default class UiBox extends Vue {
  @Prop({ required: true, type: [String] })
  contentId!: string

  @Prop({ required: true, type: [String] })
  type!: string

  @Prop({ required: true, type: [String] })
  arrow!: string

  @Prop({ type: [String] })
  icon!: string

  get typeClass () {
    switch (this.type) {
      case 'info':
        return `${this.arrow}-arrow bg-blue-100 text-blue-500`
      case 'warning':
        return `${this.arrow}-arrow bg-orange-100 text-orange-500`
      default:
        throw new Error('UI Box type not recognised')
    }
  }

  get iconClass () {
    switch (this.icon) {
      case 'recommendation':
        return 'lightbulb'
      case 'ram':
        return 'sd-card'
      default:
        throw new Error('UI Box icon type not recognised')
    }
  }
}

</script>
