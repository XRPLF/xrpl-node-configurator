<template>
  <div class="mb-14">
    <UiErrorBox :display="$v.$anyError"></UiErrorBox>
    <UiStepSection helpBox="peerPrivate" @item-focus="itemFocus">
      <!-- Private peer / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="peerPrivate">
        {{ $t('settings.labels.broadcast') }}
      </label>
      <div class="w-full">
        <UiCheckbox @checkbox-change="broadcastChange($event)" :label="$t('forms.yes')" name="peerPrivate" id="peerPrivate" :value="!config.peer.private" :checked="!config.peer.private"></UiCheckbox>
      </div>
      <UiBox v-if="serverType === validatorServerType && !config.peer.private" icon="recommendation" type="warning" arrow="up" contentId="recommendations.rec0004" />
      <!-- / Private peer -->
    </UiStepSection>
    <UiStepSection helpBox="signingSupport" @item-focus="itemFocus">
      <!-- Signing Support / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="signingSupport">
        {{ $t('settings.labels.signingsupport') }}
      </label>
      <div class="w-full">
        <UiCheckbox @checkbox-change="signingSupportChange($event)" :label="$t('forms.yes')" name="signingSupport" id="signingSupport" value="signingSupport" :checked="config.signing.support"></UiCheckbox>
      </div>
      <!-- / Signing Support -->
    </UiStepSection>
    <!-- Logs / -->
    <UiStepSection helpBox="log" @item-focus="itemFocus">
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="logs">
        {{ $t('settings.labels.log') }}
      </label>
      <div class="flex">
        <div class="flex-auto">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
            {{ $t('settings.labels.loglevels') }}
          </label>
          <div class="relative">
            <UiDropdown @dropdown-change="logLevelChange($event)" :options="logLevelOptions" :selected="config.log.level" id="logLevel"></UiDropdown>
          </div>
        </div>
        <div class="flex-auto ml-4">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databasePath">
            {{ $t('settings.labels.logfile') }}
          </label>
          <div>
            <div class="relative">
              <input v-model="config.log.logFilePath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.log.logFilePath.$error && errorClass" id="logFilePath" type="text" :placeholder="$t('settings.placeholders.logfile')">
            </div>
          </div>
        </div>
      </div>
      </UiStepSection>
      <!-- / Logs -->
      <!-- Connections / -->
      <UiStepSection helpBox="connections" @item-focus="itemFocus">
        <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="database">
          {{ $t('settings.labels.connections') }}
        </label>
        <div class="flex">
          <div class="flex-auto">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
              {{ $t('settings.labels.incoming') }}
            </label>
            <div class="relative">
              <vue-slider @change="incomingConnectionsChange" v-bind="incomingSliderOptions" v-model="config.connections.incoming" />
              <div class="text-gray-700">{{ config.connections.incoming }}</div>
            </div>
          </div>
          <div class="flex-auto ml-4">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databasePath">
              {{ $t('settings.labels.outgoing') }}
            </label>
            <div>
              <div class="relative">
                <vue-slider @change="outgoingConnectionsChange" v-bind="outgoingSliderOptions" v-model="config.connections.outgoing" />
                <div class="text-gray-700">{{ config.connections.outgoing }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- / Connections -->
    </UiStepSection>
  </div>
</template>

<script lang="ts">
import UiStepSection from '@/components/custom/UiStepSection.vue'
import UiCheckbox from '@/components/custom/UiCheckbox.vue'
import UiDropdown from '@/components/custom/UiDropdown.vue'
import UiErrorBox from '@/components/custom/UiErrorBox.vue'
import UiBox from '@/components/custom/UiBox.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { LogLevel, ServerType } from '@/enums'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import validate from '../services/validate'
// eslint-disable-next-line no-unused-vars
import { SettingsConfig } from '@/types/SettingsConfig'

const validateClientFilePath = (value: string) => validate.mustBeFilePath(value)

@Component({
  name: 'Step5',
  components: {
    UiStepSection,
    UiCheckbox,
    UiDropdown,
    UiErrorBox,
    UiBox,
    VueSlider
  },
  validations: {
    config: {
      peer: {
        private: {
          required
        }
      },
      signing: {
        support: {
          required
        }
      },
      log: {
        level: {
          required
        },
        logFilePath: {
          validateClientFilePath
        }
      }
    }
  }
})
export default class Step5 extends Vue {
  created () {
    this.$store.commit('setStep', 5)
    this.$root.$emit('page-item-init', 'step5')
    this.$v.$touch()
    this.$root.$on('json-config-changed', (cfg: any) => {
      console.log('cfg.settings', cfg.settings)
      this.config = cfg.settings
    })
  }

  step = 5
  logLevelOptions = [
    {
      name: 'Debug',
      value: LogLevel.DEBUG,
      id: 'logLevelDebug'
    },
    {
      name: 'Warning',
      value: LogLevel.WARNING,
      id: 'logLevelWarning'
    },
    {
      name: 'Error',
      value: LogLevel.ERROR,
      id: 'logLevelError'
    },
    {
      name: 'Fatal',
      value: LogLevel.FATAL,
      id: 'logLevelFatal'
    },
    {
      name: 'Info',
      value: LogLevel.INFO,
      id: 'logLevelInfo'
    }
  ]

  defaultSliderOptions = {
    dotSize: 14,
    height: 6,
    interval: 1,
    tooltip: 'active',
    tooltipPlacement: 'bottom',
    useKeyboard: false,
    enableCross: true,
    minRange: 0,
    maxRange: 0,
    order: true,
    marks: false,
    process: true
  }

  incomingSliderOptions = { ...this.defaultSliderOptions, min: 0, max: 1000 }
  outgoingSliderOptions = { ...this.defaultSliderOptions, min: 10, max: 1000 }

  config: SettingsConfig = this.$store.getters.localStorageState.settings || {}
  serverType: ServerType = this.$store.getters.localStorageState.server.runAs
  validatorServerType: ServerType = ServerType.VALIDATOR

  get errorClass () {
    return 'bg-yellow-200 border-yellow-300'
  }

  @Watch('$v.$anyError')
  errorChanged (newVal: string) {
    this.$root.$emit('any-error-step-5', newVal)
  }

  saveCfg () {
    this.$store.commit('saveConfig', {
      key: 'settings',
      cfg: this.config
    })
  }

  logLevelChange (value: LogLevel) {
    this.config.log.level = value
    this.saveCfg()
  }

  broadcastChange (value: boolean) {
    this.config.peer.private = !value
    this.saveCfg()
  }

  incomingConnectionsChange (value: number) {
    this.config.connections.incoming = value
    this.saveCfg()
  }

  outgoingConnectionsChange (value: number) {
    this.config.connections.outgoing = value
    this.saveCfg()
  }

  signingSupportChange (value: boolean) {
    this.config.signing.support = value
    this.saveCfg()
  }

  itemFocus (value: string) {
    this.$root.$emit('page-item-focus', value)
  }
}
</script>
