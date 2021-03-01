<template>
  <!-- Steps / -->
    <div class="w-full py-1">
      <div class="flex">
        <button @click="goTo(1)" class="w-1/6 focus:outline-none">
          <div class="relative mb-2">
            <div :class="(currentStep>=1) ? 'bg-green-500' : ''" class="flex items-center w-10 h-10 mx-auto text-lg text-white rounded-full">
              <span class="w-full text-center text-white">
                <UiAlertIcon :display="anyerror.step1 === true"></UiAlertIcon>
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path class="heroicon-ui" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </span>
            </div>
          </div>
    
          <div :class="(currentStep===1) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.1') }}</div>
        </button>
    
        <button @click="goTo(2)" class="w-1/6 focus:outline-none">
          <div class="relative mb-2">
            <div class="absolute flex items-center content-center align-middle align-center" style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)">
              <div class="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div class="w-0 py-1 bg-green-300 rounded" :style="(currentStep>=2) ? 'width: 100%;' : 'width: 0%;'"></div>
              </div>
            </div>
            <div :class="(currentStep>=2) ? 'bg-green-500 text-white border-white' : 'border-gray-200'" class="flex items-center w-10 h-10 mx-auto text-lg border-2 rounded-full">
              <span :class="(currentStep>=2) ? '' : 'text-gray-600'" class="w-full text-center">
                <UiAlertIcon :display="anyerror.step2 === true"></UiAlertIcon>
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456 512" width="18" height="18">
                  <path fill="currentColor" d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path>
                </svg>
              </span>
            </div>
          </div>
    
          <div :class="(currentStep===2) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.2') }}</div>
        </button>
    
        <button @click="goTo(3)" class="w-1/6 focus:outline-none">
          <div class="relative mb-2">
            <div class="absolute flex items-center content-center align-middle align-center" style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)">
              <div class="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div class="w-0 py-1 bg-green-300" :style="(currentStep>=3) ? 'width: 100%;' : 'width: 0%;'"></div>
              </div>
            </div>
    
            <div :class="(currentStep>=3) ? 'bg-green-500 text-white border-white' : 'border-gray-200'" class="flex items-center w-10 h-10 mx-auto text-lg text-white bg-white border-2 rounded-full">
              <span :class="(currentStep>=3) ? '' : 'text-gray-600'" class="w-full text-center">
                <UiAlertIcon :display="anyerror.step3 === true"></UiAlertIcon>
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18" height="18">
                  <path fill="currentColor" d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path>
                </svg>
              </span>
            </div>
          </div>
    
          <div :class="(currentStep===3) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.3') }}</div>
        </button>
    
        <button @click="goTo(4)" class="w-1/6 focus:outline-none">
          <div class="relative mb-2">
            <div class="absolute flex items-center content-center align-middle align-center" style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)">
              <div class="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div class="w-0 py-1 bg-green-300 rounded" :style="(currentStep>=4) ? 'width: 100%;' : 'width: 0%;'"></div>
              </div>
            </div>
    
            <div :class="(currentStep>=4) ? 'bg-green-500 text-white border-white' : 'border-gray-200'" class="flex items-center w-10 h-10 mx-auto text-lg text-white bg-white border-2 rounded-full">
              <span :class="(currentStep>=4) ? '' : 'text-gray-600'" class="w-full text-center">
                <UiAlertIcon :display="anyerror.step4 === true"></UiAlertIcon>
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="20" height="20">
                  <path fill="currentColor" d="M248 43.4C130.6 43.4 35.4 138.6 35.4 256S130.6 468.6 248 468.6 460.6 373.4 460.6 256 365.4 43.4 248 43.4zm-97.4 132.9c0-53.7 43.7-97.4 97.4-97.4s97.4 43.7 97.4 97.4v26.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-26.6c0-82.1-124-82.1-124 0v26.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-26.6zM389.7 380c0 9.7-8 17.7-17.7 17.7H124c-9.7 0-17.7-8-17.7-17.7V238.3c0-9.7 8-17.7 17.7-17.7h248c9.7 0 17.7 8 17.7 17.7V380zm-248-137.3v132.9c0 2.5-1.9 4.4-4.4 4.4h-8.9c-2.5 0-4.4-1.9-4.4-4.4V242.7c0-2.5 1.9-4.4 4.4-4.4h8.9c2.5 0 4.4 1.9 4.4 4.4zm141.7 48.7c0 13-7.2 24.4-17.7 30.4v31.6c0 5-3.9 8.9-8.9 8.9h-17.7c-5 0-8.9-3.9-8.9-8.9v-31.6c-10.5-6.1-17.7-17.4-17.7-30.4 0-19.7 15.8-35.4 35.4-35.4s35.5 15.8 35.5 35.4zM248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 478.3C121 486.3 17.7 383 17.7 256S121 25.7 248 25.7 478.3 129 478.3 256 375 486.3 248 486.3z"></path>
                </svg>
              </span>
            </div>
          </div>
    
          <div :class="(currentStep===4) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.4') }}</div>
        </button>

        <button @click="goTo(5)" class="w-1/6 focus:outline-none">
          <div class="relative mb-2">
            <div class="absolute flex items-center content-center align-middle align-center" style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)">
              <div class="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div class="w-0 py-1 bg-green-300 rounded" :style="(currentStep>=5) ? 'width: 100%;' : 'width: 0%;'"></div>
              </div>
            </div>
    
            <div :class="(currentStep>=5) ? 'bg-green-500 text-white border-white' : 'border-gray-200'" class="flex items-center w-10 h-10 mx-auto text-lg text-white bg-white border-2 rounded-full">
              <span :class="(currentStep>=5) ? '' : 'text-gray-600'" class="w-full text-center">
                <UiAlertIcon :display="anyerror.step5 === true"></UiAlertIcon>
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18">
                  <path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path>
                </svg>
              </span>
            </div>
          </div>
    
          <div :class="(currentStep===5) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.5') }}</div>
        </button>

        <div class="w-1/6">
          <div class="relative mb-2">
            <div class="absolute flex items-center content-center align-middle align-center" style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)">
              <div class="items-center flex-1 w-full align-middle bg-gray-200 rounded align-center">
                <div class="w-0 py-1 bg-green-300 rounded" :style="(currentStep>=6) ? 'width: 100%;' : 'width: 0%;'"></div>
              </div>
            </div>
    
            <div :class="(currentStep==6) ? 'bg-green-500 text-white border-white' : 'border-gray-200'" class="flex items-center w-10 h-10 mx-auto text-lg text-white bg-white border-2 rounded-full">
              <span :class="(currentStep==6) ? '' : 'text-gray-600'" class="w-full text-center">
                <svg class="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/>
                </svg>
              </span>
            </div>
          </div>

          <div :class="(currentStep==6) ? 'text-green-500' : 'text-gray-500'" class="text-xs text-center md:text-base">{{ $t('header.steps.6') }}</div>
        </div>
      </div>
    </div>
    <!-- / Steps -->
</template>

<script lang="ts">
import i18n from '../../i18n'
import { getPathFromStepNumber } from '@/util/navUtils'
import { Component, Vue, Prop } from 'vue-property-decorator'
import UiAlertIcon from './UiAlertIcon.vue'

interface Errors {
  step1: boolean,
  step2: boolean,
  step3: boolean,
  step4: boolean,
  step5: boolean
}

@Component({
  name: 'UiSteps',
  components: {
    UiAlertIcon
  }
})
export default class UiSteps extends Vue {
 name: string = 'UiSteps'

  @Prop() readonly current!: Number

  currentStep: number = this.$store.state.currentStep
  anyerror: Errors = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false
  }

  goTo (step: number): void {
    this.$store.commit('setStep', step)
    this.currentStep = step
    this.$router.push(getPathFromStepNumber(step))
  }

  created () {
    i18n.locale = this.$store.getters.localStorageLocale || i18n.locale
    this.$store.subscribe((mutation: any, state: any) => {
      if (mutation.type === 'setStep' || mutation.type === 'stepIncrement' || mutation.type === 'stepDecrement') {
        this.currentStep = state.currentStep
      }
    })

    // Step warnings
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
