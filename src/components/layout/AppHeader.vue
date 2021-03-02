<template>
  <div class="border-b-2 pl-4 border-gray-200 lg:flex lg:items-center lg:justify-between">
    <div class="w-full min-w-0 pb-4">
      <div>
        <a href="https://github.com/XRPLF/xrpl-node-configurator" class="github-corner" :aria-label="$t('header.viewsource')"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
      </div>
      <div>
        <!-- Language -->
        <ul class="inline list-inline">
          <li class="float-left">
            <button :class="(currentLocale == 'es') ? 'text-teal-500' : 'text-gray-500'" @click="setLocale('es')" :title="$t('language.es.title')" class="border-0 btn btn-default focus:outline-none">{{ $t('language.es.button') }}</button>
          </li>
          <li class="float-left ml-3">
            <button :class="(currentLocale == 'en') ? 'text-teal-500' : 'text-gray-500'" @click="setLocale('en')" :title="$t('language.en.title')" class="border-0 btn btn-default focus:outline-none">{{ $t('language.en.button') }}</button>
          </li>
        </ul>
        <a href="schema/schema.json" target="_blank" class="text-blue-400 ml-3" title="JSON Schema">
          {{ $t('header.schema') }}
        </a>
      </div>
      <h2 class="text-2xl font-bold leading-7 text-blue-700 sm:text-3xl sm:leading-9 sm:truncate">
        <svg width="36" viewBox="0 0 512 424" class="inline -mt-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Canvas" fill="none">
            <g id="xrp-symbol">
              <path id="Vector" d="M 436.043 0L 510.096 0L 356.029 152.475C 300.258 207.67 209.837 207.67 154.067 152.475L 2.51594e-08 0L 74.0526 0L 191.093 115.832C 226.414 150.788 283.68 150.788 319.002 115.832L 436.043 0Z" transform="translate(0.943848 0)" fill="#2A6DB0"/>
              <path id="Vector_2" d="M 74.0527 194.813L 0 194.813L 155.019 41.3955C 210.789 -13.7985 301.21 -13.7985 356.981 41.3955L 512 194.813L 437.947 194.813L 319.953 78.0385C 284.632 43.0821 227.366 43.0821 192.045 78.0385L 74.0527 194.813Z" transform="translate(0 229.187)" fill="#2A6DB0"/>
            </g>
          </g>
        </svg>
        {{ $t('header.title') }}
        <span class="text-gray-400 text-sm ml-2 font-light" id="appVersion">
          v{{ appVersion }}
        </span>
      </h2>
      <div class="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
        <div class="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mr-6">
          <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          {{ $t('header.supportedVersion') }} {{ support.max }}+
        </div>
      </div>
    </div>
    <UiSteps :current="currentStep"></UiSteps>
  </div>
</template>

<script lang="ts">
import UiSteps from '@/components/custom/UiSteps.vue'
import i18n from '../../i18n'
import store from '../../store'
import { Component, Vue } from 'vue-property-decorator'
import * as appConfig from '../../../cfg/app.json'

@Component({
  name: 'AppHeader',
  components: {
    UiSteps
  }
})
export default class AppHeader extends Vue {
  currentLocale = store.getters.localStorageLocale
  currentStep = parseInt(store.getters.localStorageStep || 1)
  appVersion = store.getters.localStorageAppVersion
  support = appConfig.support

  setLocale (locale: string) {
    this.currentLocale = locale
    store.commit('saveLocale', locale)
    i18n.locale = locale
    this.$root.$emit('locale-changed', `${locale}`)
  }
}
</script>

<style>
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}
  @keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}
  @media (max-width:500px){
    .github-corner:hover .octo-arm{animation:none}
    .github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}
  }
</style>
