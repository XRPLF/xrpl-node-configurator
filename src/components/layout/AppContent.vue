<template>
  <div class="flex pt-2">
    <div class="border-r-2 w-3/5 mb-6 mr-2">
    <transition name="fade">
        <router-view></router-view>
    </transition>
    </div>
    <div class="w-2/5 pt-2 p-4">
        <UiHelpBox :contentKey="helpBoxContentKey"></UiHelpBox>
    </div>
  </div>
</template>

<script lang="ts">
import UiHelpBox from '@/components/custom/UiHelpBox.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppContent',
  components: {
    UiHelpBox
  }
})
export default class AppContent extends Vue {
  helpBoxContentKey = ''
  created () {
    this.$root.$on('page-item-focus', (value: string) => {
      this.helpBoxContentKey = value
    })
    this.$root.$on('page-item-select', (value: string) => {
      this.helpBoxContentKey = value
    })
    this.$root.$on('page-item-init', (value: string) => {
      this.helpBoxContentKey = value
    })
  }
}
</script>
