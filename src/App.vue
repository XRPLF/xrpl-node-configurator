<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
import defaultConfig from '../cfg/defaultConfig.json'
import { Component, Vue } from 'vue-property-decorator'

const defaultLayout = 'default'

@Component
export default class App extends Vue {
  get layout (): string {
    return (this.$route.meta.layout || defaultLayout) + '-layout'
  }
  
  created () {
    this.$store.commit('initialize', defaultConfig)
  }
}
</script>
