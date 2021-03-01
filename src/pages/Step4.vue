<template>
  <div class="mb-14">
    <UiErrorBox :display="$v.$anyError"></UiErrorBox>
    <UiStepSection helpBox="sslClient" @item-focus="itemFocus">
      <!-- SSL Client / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="serverType">
        {{ $t('security.labels.sslclient') }}
      </label>
      <div class="w-full">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslClientVerify">
          {{ $t('security.labels.sslclientverify') }}
        </label>
        <UiCheckbox @checkbox-change="verifyChange($event)" :label="$t('forms.yes')" id="sslClientVerify" name="sslClientVerify" value="sslClientVerify" :checked="config.client.verify"></UiCheckbox>
      </div>
      <div class="w-full mt-3 mr-4" v-if="config.client.verify">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslVerifyDir">
          {{ $t('security.labels.sslverifydir') }}
        </label>
        <input @change="saveCfg()" v-model="config.client.fileOrDirPath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.client.fileOrDirPath.$error && errorClass" id="sslVerifyDir" type="text" :placeholder="$t('security.placeholders.sslverifydir')">
      </div>
      <div class="w-full mt-3 mr-4" v-if="config.client.verify">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslVerifyFile">
          {{ $t('security.labels.sslverifyfile') }}
        </label>
        <input @change="saveCfg()" v-model="config.client.filePath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.client.filePath.$error && errorClass" id="sslVerifyFile" type="text" :placeholder="$t('security.placeholders.sslverifyfile')">
      </div>
      <!-- / SSL Client -->
    </UiStepSection>
    <UiStepSection helpBox="sslServer" @item-focus="itemFocus">
      <!-- SSL Server / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="serverType">
        {{ $t('security.labels.sslserver') }}
      </label>
      <div class="w-full">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslServer">
          {{ $t('security.labels.sslserververify') }}
        </label>
        <UiCheckbox @checkbox-change="serverChange($event)" :label="$t('forms.yes')" id="sslServer" name="sslServer" value="sslServer" :checked="config.server.enabled"></UiCheckbox>
        <div class="p-2 text-sm italic text-gray-600" v-if="config.server.enabled">
          {{ $t('security.labels.sslserverwarning') }}
        </div>
      </div>
      <div class="w-full mt-3 mr-4" v-if="config.server.enabled">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslServerCert">
          {{ $t('security.labels.sslservercert') }}
        </label>
        <input @change="saveCfg()" v-model="config.server.certPath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.server.certPath.$error && errorClass" id="sslServerCert" type="text" :placeholder="$t('security.placeholders.sslservercert')">
      </div>
      <div class="w-full mt-3 mr-4" v-if="config.server.enabled">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="sslServerKey">
          {{ $t('security.labels.sslserverkey') }}
        </label>
        <input @change="saveCfg()" v-model="config.server.keyPath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.server.keyPath.$error && errorClass" id="sslServerKey" type="text" :placeholder="$t('security.placeholders.sslserverkey')">
      </div>
      <!-- / SSL Server -->
    </UiStepSection>
  </div>
</template>

<script lang="ts">
import UiStepSection from '@/components/custom/UiStepSection.vue'
import UiCheckbox from '@/components/custom/UiCheckbox.vue'
import UiErrorBox from '@/components/custom/UiErrorBox.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import validate from '../services/validate'
// eslint-disable-next-line no-unused-vars
import { SslConfig } from '@/types/SslConfig'

const validateClientFilePathIfRequired = (value: string, vm: any) => vm.verify ? validate.mustBeFilePath(value) : true
const validateClientDirOrFilePathIfRequired = (value: string, vm: any) => vm.verify ? validate.mustBeDirOrFilePath(value) : true
const validateServerFilePathIfRequired = (value: string, vm: any) => vm.enabled ? validate.mustBeFilePath(value) : true

@Component({
  name: 'Step4',
  components: {
    UiStepSection,
    UiCheckbox,
    UiErrorBox
  },
  validations: {
    config: {
      client: {
        verify: {
          required
        },
        filePath: {
          validateClientFilePathIfRequired
        },
        fileOrDirPath: {
          validateClientDirOrFilePathIfRequired
        }
      },
      server: {
        enabled: {
          required
        },
        certPath: {
          validateServerFilePathIfRequired
        },
        keyPath: {
          validateServerFilePathIfRequired
        }
      }
    }
  }
})
export default class Step4 extends Vue {
  created () {
    this.$store.commit('setStep', 4)
    this.$root.$emit('page-item-init', 'step4')
    this.$v.$touch()
    this.$root.$on('json-config-changed', (cfg: any) => {
      this.config = cfg.ssl
    })
  }

  step = 3
  config: SslConfig = this.$store.getters.localStorageState.ssl || {}

  get errorClass () {
    return 'bg-yellow-200 border-yellow-300'
  }

  @Watch('$v.$anyError')
  errorChanged (newVal: string) {
    this.$root.$emit('any-error-step-4', newVal)
  }

  saveCfg () {
    this.$store.commit('saveConfig', {
      key: 'ssl',
      cfg: this.config
    })
  }

  verifyChange (value: boolean) {
    this.config.client.verify = value
    if (!this.config.client.verify) {
      this.config.client.filePath = undefined
      this.config.client.fileOrDirPath = undefined
    }
    this.saveCfg()
  }

  serverChange (value: boolean) {
    this.config.server.enabled = value
    if (!this.config.server.enabled) {
      this.config.server.keyPath = undefined
      this.config.server.certPath = undefined
    }
    this.saveCfg()
  }

  itemFocus (value: string) {
    this.$root.$emit('page-item-focus', value)
  }

  itemSelect (value: string) {
    this.$root.$emit('page-item-select', `${value}`)
  }
}
</script>
