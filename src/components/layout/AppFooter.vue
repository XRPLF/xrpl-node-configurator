<template>
  <div class="flex justify-center p-4 pt-2 bg-white border-t-2 footer">
    <div class="flex w-full mt-5 lg:mt-0 lg:ml-4">
      <div class="w-3/5 py-3 text-center">
        <div class="inline-flex">
          <button :disabled="currentStep == 1" @click="validateAndBack" type="button" :class="(currentStep == 1) ? 'cursor-not-allowed opacity-50' : 'hover:border-transparent hover:bg-blue-500 hover:text-white'" class="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
            &#60; {{ $t('footer.previous') }}
          </button>
          <button :disabled="currentStep == 5 || disable" @click="validateAndNext" type="button" :class="(currentStep == 5 || disable) ? 'cursor-not-allowed opacity-50' : 'hover:border-transparent hover:bg-blue-500 hover:text-white'" class="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
            {{ $t('footer.next') }} &#62;
          </button>
        </div>
      </div>

      <div class="w-2/5 py-3 text-right pr-4">
        <button @click="explore" class="inline-flex px-4 py-2 font-bold text-gray-800 bg-gray-300 border-b-4 border-gray-400 rounded hover:bg-gray-400 hover:border-gray-500" id="exploreBtn">
          <svg class="w-5 h-5 pt-1 mr-2 -ml-1 text-gray-500" height="20" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m141 126c0-8.271 6.729-15 15-15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-24.813 0-45 20.187-45 45v73.944c0 17.55-8.718 33.84-23.32 43.575-4.173 2.782-6.68 7.466-6.68 12.481s2.507 9.699 6.68 12.48c14.603 9.735 23.32 26.025 23.32 43.575v73.945c0 24.813 20.187 45 45 45h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-8.271 0-15-6.729-15-15v-73.944c0-21.076-7.994-40.997-21.999-56.056 14.005-15.059 21.999-34.979 21.999-56.056z"/><path d="m424.32 243.52c-14.603-9.735-23.32-26.025-23.32-43.575v-73.945c0-24.813-20.187-45-45-45h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.271 0 15 6.729 15 15v73.944c0 21.076 7.994 40.997 21.999 56.056-14.005 15.059-21.999 34.979-21.999 56.056v73.944c0 8.271-6.729 15-15 15h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c24.813 0 45-20.187 45-45v-73.944c0-17.55 8.718-33.84 23.32-43.575 4.173-2.782 6.68-7.465 6.68-12.48s-2.507-9.7-6.68-12.481z"/><path d="m437 0h-362c-41.355 0-75 33.645-75 75v362c0 41.355 33.645 75 75 75h362c41.355 0 75-33.645 75-75v-362c0-41.355-33.645-75-75-75zm45 437c0 24.813-20.187 45-45 45h-362c-24.813 0-45-20.187-45-45v-362c0-24.813 20.187-45 45-45h362c24.813 0 45 20.187 45 45z"/></g></svg>
          <span>{{ $t('footer.json') }}</span>
        </button>
        <input type="file" @change="uploadFile" ref="uploadConfigFile" hidden>
        <button @click="load" class="inline-flex px-4 py-2 font-bold text-gray-800 bg-gray-300 border-b-4 border-gray-400 rounded hover:bg-gray-400 hover:border-gray-500" id="loadBtn">
          <svg class="w-5 h-5 pt-1 mr-2 -ml-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
          <g>
            <g>
              <path d="M426.635,188.224C402.969,93.946,307.358,36.704,213.08,60.37C139.404,78.865,85.907,142.542,80.395,218.303
                C28.082,226.93-7.333,276.331,1.294,328.644c7.669,46.507,47.967,80.566,95.101,80.379h80v-32h-80c-35.346,0-64-28.654-64-64
                c0-35.346,28.654-64,64-64c8.837,0,16-7.163,16-16c-0.08-79.529,64.327-144.065,143.856-144.144
                c68.844-0.069,128.107,48.601,141.424,116.144c1.315,6.744,6.788,11.896,13.6,12.8c43.742,6.229,74.151,46.738,67.923,90.479
                c-5.593,39.278-39.129,68.523-78.803,68.721h-64v32h64c61.856-0.187,111.848-50.483,111.66-112.339
                C511.899,245.194,476.655,200.443,426.635,188.224z"/>
              <path d="M245.035,253.664l-64,64l22.56,22.56l36.8-36.64v153.44h32v-153.44l36.64,36.64l22.56-22.56l-64-64
                C261.354,247.46,251.276,247.46,245.035,253.664z"/>
            </g>
          </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
          </svg>
          <span>{{ $t('footer.load') }}</span>
        </button>

        <button id="generateBtn" :disabled="disable" @click="generate" class="inline-flex px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-700 hover:border-blue-800" :class="(disable) ? 'disabled:opacity-50 cursor-not-allowed' : ''">
          <svg class="w-4 h-4 mt-1 mr-2 fill-current" height="20" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m475.082031 205.300781c-5.609375-24.34375-15.101562-47.269531-28.316406-68.378906l19.03125-31.742187-58.976563-58.976563-31.742187 19.03125c-21.109375-13.214844-44.035156-22.707031-68.378906-28.316406l-8.980469-36.917969h-83.4375l-8.980469 36.917969c-24.34375 5.609375-47.269531 15.101562-68.378906 28.316406l-31.742187-19.03125-58.976563 58.976563 19.03125 31.742187c-13.214844 21.109375-22.707031 44.035156-28.316406 68.378906l-36.917969 8.980469v83.4375l36.917969 8.980469c5.609375 24.34375 15.101562 47.269531 28.316406 68.378906l-19.03125 31.742187 58.976563 58.976563 31.742187-19.03125c21.109375 13.214844 44.035156 22.707031 68.378906 28.316406l8.980469 36.917969h83.4375l8.980469-36.917969c24.34375-5.609375 47.269531-15.101562 68.378906-28.316406l31.742187 19.03125 58.976563-58.976563-19.03125-31.742187c13.214844-21.109375 22.707031-44.035156 28.316406-68.378906l36.917969-8.980469v-83.4375zm-219.082031 215.699219c-90.980469 0-165-74.019531-165-165s74.019531-165 165-165 165 74.019531 165 165-74.019531 165-165 165zm0 0"/><path d="m271 121.921875-117.816406 179.078125h87.816406v89.078125l117.816406-179.078125h-87.816406zm0 0"/></svg>
          <span>{{ $t('footer.generate') }}</span>
        </button>

        <UiDialog :json="JSON.stringify(this.getJsonConfig(), null, 3)" width="80%" height="60%" id="jsonCfg" name="jsonCfg"></UiDialog>
        <UiValidations :data="validationErrors" name="validation"></UiValidations>
        <UiRecomendations @ignore="onIgnoreRecommendations" :data="recommendations" name="recommendations"></UiRecomendations>
        <UiErrorPopup :error="unexpectedError" name="footerError"></UiErrorPopup>
        <UiSuccessPopup :title="$t('modal.upload.title')" :message="$t('modal.upload.message')" name="uploadSuccess"></UiSuccessPopup>

      </div>
  
    </div>
  </div>
</template>

<script lang="ts">
import UiDialog from '@/components/custom/UiDialog.vue'
import UiValidations from '@/components/custom/UiValidations.vue'
import UiRecomendations from '@/components/custom/UiRecommendations.vue'
import UiErrorPopup from '@/components/custom/UiErrorPopup.vue'
import UiSuccessPopup from '@/components/custom/UiSuccessPopup.vue'
import rippled from '@/services/rippled'
import instructions from '@/services/instructions'
import { getPathFromStepNumber } from '@/util/navUtils'
import { Component, Vue } from 'vue-property-decorator'
import validate from '@/services/validate'
import recommend from '@/services/recommend'
import { ConfigGroup, ServerType } from '@/enums'
// eslint-disable-next-line no-unused-vars
import { Config } from '@/types/Config'
// eslint-disable-next-line no-unused-vars
import { RecommendationResult } from '@/types/RecommendationResult'
import JSZip from 'jszip'
import moment from 'moment'
import i18n from '@/i18n'

const saveAs = require('file-saver').saveAs

@Component({
  name: 'AppFooter',
  components: {
    UiDialog,
    UiRecomendations,
    UiValidations,
    UiErrorPopup,
    UiSuccessPopup
  }
})
export default class AppFooter extends Vue {
  currentStep = this.$store.state.currentStep
  jsonConfig = this.$store.state.config
  validationErrors: any[] = []
  recommendations: RecommendationResult[] = []
  unexpectedError = ''
  locale = this.$store.getters.localStorageLocale || i18n.locale
  
  anyerror = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false
  }

  get disable () {
    return (this.currentStep === 6 || this.anyerror.step1 || this.anyerror.step2 || this.anyerror.step3 || this.anyerror.step4 || this.anyerror.step5)
  }

  onIgnoreRecommendations () {
    this.validateConfig(this.getJsonConfig())
  }

  load () {
    (this.$refs.uploadConfigFile as HTMLElement).click()
  }

  getJsonConfig () {
    return this.$store.state.config
  }

  async readJsonFile (file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      let result = ''
      reader.onerror = e => {
        reject(e)
      }
      reader.onload = r => {
        try {
          result = JSON.parse(r.target!.result!.toString())
          resolve(result)
        } catch (e) {
          reject(e)
        }
      }
      reader.readAsText(file)
    })
  }

  async uploadFile (event: { target: { files: Blob[] } }) {
    try {
      const content = await this.readJsonFile(event.target.files[0])
      this.$store.commit('initialize', content)
      this.$root.$emit('json-config-changed', content)
    } catch (e) {
      this.unexpectedError = i18n.t('errors.jsonconfig').toString()
      this.$modal.show('footerError', {
        title: 'Error'
      })
    }
    (this.$refs.uploadConfigFile as HTMLInputElement).value = ''
  }

  validateAndNext () {
    this.$store.commit('stepIncrement')
    const path = getPathFromStepNumber(this.currentStep)
    if (this.$route.path !== path) this.$router.push(path)
  }

  validateAndBack () {
    this.$store.commit('stepDecrement')
    const path = getPathFromStepNumber(this.currentStep)
    if (this.$route.path !== path) this.$router.push(path)
  }

  explore () {
    this.jsonConfig = this.getJsonConfig()
    this.$modal.show('jsonCfg', {
      title: 'JSON Config'
    })
  }

  generate () {
    try {
      const config = this.getJsonConfig()
      const recommendations = recommend.list(ConfigGroup.ALL, config)
      if (recommendations.length > 0) {
        this.recommendations = recommendations
        this.$modal.show('recommendations', {
          title: i18n.t('recommendations.title')
        })
      } else {
        this.validateConfig(config)
      }
    } catch (e) {
      this.unexpectedError = e.message
      this.$modal.show('footerError', {
        title: 'Error'
      })
    }
  }

  rippledCfg (config: Config) {
    const blobContent = rippled.generateRippledCfg(config)
    const blob = new Blob(blobContent, { type: 'text/plain;charset=utf-8' })
    return blob
  }

  validatorsTxt (config: Config) {
    const blobContent = rippled.generateValidatorsCfg(config)
    const blob = new Blob(blobContent, { type: 'text/plain;charset=utf-8' })
    return blob
  }

  getFileName () {
    return moment().format('MMMM_Do_YYYY_h:mm:ss')
  }

  instructions (validator: boolean, locale: string) {
    return instructions.get(validator, locale)
  }

  isItAValidator (config: Config) {
    return (config.server.runAs === ServerType.VALIDATOR)
  }

  async zipFile (config: Config) {
    const zip = new JSZip()
    const cfgFolder = zip.folder('config')
    const downloadName = this.getFileName()
    const instructions = await this.instructions(this.isItAValidator(config), this.locale)
    cfgFolder!.file('rippled.cfg', this.rippledCfg(config))
    cfgFolder!.file('validations.txt', this.validatorsTxt(config))
    zip.file('instructions.txt', instructions)
    zip.file('cfg.json', JSON.stringify(config, null, 1))
    const content = await zip.generateAsync({ type: 'blob' })
    return saveAs(content, `xrpl_node_cfg_${downloadName}.zip`)
  }

  async validateConfig (config: Config) {
    try {
      const validation = validate.jsonWithSchema(config)
      if (!validation.valid) {
        this.validationErrors = validation.errors
        this.$modal.show('validation', {
          title: i18n.t('errors.validationtitle')
        })
      } else {
        await this.zipFile(config)
        this.currentStep = 6
        this.$store.commit('setStep', this.currentStep)
        const path = getPathFromStepNumber(this.currentStep)
        if (this.$route.path !== path) this.$router.push(path)
      }
    } catch (e) {
      this.unexpectedError = e.message
      this.$modal.show('footerError', {
        title: 'Error'
      })
    }
  }
  
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setStep' || mutation.type === 'stepIncrement' || mutation.type === 'stepDecrement') {
        this.currentStep = state.currentStep
      }
    })
    this.$root.$on('any-error-step-1', (value: boolean) => {
      this.anyerror.step1 = value
    })
    this.$root.$on('any-error-step-2', (value: boolean) => {
      this.anyerror.step2 = value
    })
    this.$root.$on('any-error-step-3', (value: boolean) => {
      this.anyerror.step3 = value
    })
    this.$root.$on('any-error-step-4', (value: boolean) => {
      this.anyerror.step4 = value
    })
    this.$root.$on('any-error-step-5', (value: boolean) => {
      this.anyerror.step5 = value
    })
  }
}
</script>

<style>
.footer {
  position: fixed;
  height: 100px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
}
</style>
