<template>
  <div id="app">
    <AppHeader />
    <AppContent />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppContent from '@/components/layout/AppContent.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,
    AppContent
  }
}
</script>
