<template>
  <div class="mb-14">
    <UiErrorBox :display="$v.$anyError"></UiErrorBox>
    <UiStepSection helpBox="nodeSizes" @item-focus="itemFocus">
      <!-- Node Size / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="nodeSize">
        {{ $t('protocol.labels.size') }}
      </label>
      <div class="flex">
        <div class="flex-auto">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
            {{ $t('protocol.labels.nodesize') }}
          </label>
          <div class="relative">
            <UiDropdown @dropdown-change="nodeSizeChange($event)" :options="nodeSizeOptions" :selected="config.nodeSize" id="nodeSize"></UiDropdown>
          </div>
        </div>
        <div class="flex-auto w-3/4 mt-6 pt-1">
          <UiBox type="info" arrow="left" icon="ram" :contentId="'misc.specs.' + config.nodeSize" />
        </div>
      </div>
      <UiBox v-if="config.network === mainnetNetwork && config.nodeSize !== hugeNodeSize" icon="recommendation" type="warning" arrow="up" contentId="recommendations.rec0003" />
      <!-- / Node Size -->
     </UiStepSection>

     <UiStepSection helpBox="ledgerHistory" @item-focus="itemFocus">
        <!-- Ledger History / -->
        <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="ledgerHistorySome">
          {{ $t('protocol.labels.ledgerhistory') }}
        </label>
        <div class="flex pb-2">
          <UiRadio @radio-change="historyChange($event, 'some')" :label="$t('protocol.labels.some')" name="ledgerHistory" value="some" :checked="config.history.type === historyType.SOME" id="ledgerHistorySome"></UiRadio>
          <div class="w-1/5 ml-4">
            <input @change="saveCfg()" v-model.number="config.history.ledgers" class="block w-full px-4 py-1 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.history.ledgers.$error && errorClass" id="someHistory" type="text" placeholder="256">
          </div>
          <div class="w-1/5 pt-1 pl-1 pr-3 text-left text-gray-700 md:mb-0">
            {{ $t('protocol.labels.ledgers') }}
          </div>
        </div>
        <UiBox v-if="serverType === validatorServerType && config.history.ledgers > 300000" type="warning" arrow="up" contentId="recommendations.rec0002" />
        <div class="pb-3 pt-3">
          <UiRadio @radio-change="historyChange($event, 'full')" label="Full" name="ledgerHistory" value="full" :checked="config.history.type === historyType.FULL"></UiRadio>
        </div>
        <div class="pt-3">
          <UiRadio @radio-change="historyChange($event, 'none')" label="None" name="ledgerHistory" value="none" :checked="config.history.type === historyType.NONE"></UiRadio>
        </div>
        <!-- / Ledger History -->
    </UiStepSection>
    <!-- Network & Validators / -->
    <UiStepSection helpBox="networkAndValidators" @item-focus="itemFocus">
        <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="database">
          {{ $t('protocol.labels.networkandvalidators') }}
        </label>
        <div class="flex">
          <div class="flex-auto">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
              {{ $t('protocol.labels.network') }}
            </label>
            <div class="relative">
              <UiDropdown :options="this.networkOptions" @dropdown-change="networkChange" :selected="config.network" id="network"></UiDropdown>
            </div>
          </div>
          <div class="flex-auto ml-4">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databasePath">
              {{ $t('protocol.labels.validatorslist') }}
            </label>
            <div>
              <div class="relative">
                <UiDropdown @dropdown-change="validatorsListTypeChange" :options="validatorsOptions" :selected="config.validators.type" id="validatorOptions"></UiDropdown>
              </div>
            </div>
            <div class="mt-2" v-if="config.validators.type === 'knownsites'">
              <UiMultiSelect @multiselect-change="validatorsListChange" :options="knownSitesOptions[config.network]" :selected="config.validators.list" id="validatorSitesOptions" :error="$v.config.validators.list.$error"></UiMultiSelect>
            </div>
            <div v-if="config.validators.type === 'ownsites'">
              <textarea class="w-full h-24 ml-2 border rounded focus:outline-none focus:shadow-outline" id="validatorsSites"></textarea>
            </div>
            <div class="float-right p-2 text-sm italic text-gray-500" v-if="config.validators.type === 'knownsites'">
              {{ $t('protocol.help.sitesselection') }}
            </div>
          </div>
        </div>
        <!-- / Network & Validators -->
    </UiStepSection>
  </div>
</template>

<script lang="ts">
import UiStepSection from '@/components/custom/UiStepSection.vue'
import UiDropdown from '@/components/custom/UiDropdown.vue'
import UiRadio from '@/components/custom/UiRadio.vue'
import UiBox from '@/components/custom/UiBox.vue'
import UiMultiSelect from '@/components/custom/UiMultiSelect.vue'
import UiErrorBox from '@/components/custom/UiErrorBox.vue'
import { Network, ServerType, ValidatorListType, NodeSize, HistoryType } from '@/enums'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { required, alpha, numeric, requiredIf } from 'vuelidate/lib/validators'
import i18n from '@/i18n'
import * as appConfig from '../../cfg/app.json'
// eslint-disable-next-line no-unused-vars
import { ProtocolConfig } from '@/types/ProtocolConfig'
import { getSelectOption } from '@/util/formUtils'

const mustBeNumeric = (value: string) => {
  return !isNaN(+value)
}

const greaterThanZero = (value: number) => value > 0

@Component({
  name: 'Step2',
  components: {
    UiStepSection,
    UiDropdown,
    UiRadio,
    UiBox,
    UiMultiSelect,
    UiErrorBox
  },
  validations: {
    config: {
      nodeSize: {
        required,
        alpha
      },
      history: {
        type: {
          required,
          alpha
        },
        ledgers: {
          numeric,
          mustBeNumeric,
          maxValue: greaterThanZero,
          required: requiredIf((vm) => {
            return vm.type === HistoryType.SOME
          })
        }
      },
      validators: {
        type: {
          alpha
        },
        list: {
          required
        }
      },
      network: {
        required,
        alpha
      }
    }
  }
})
export default class Step2 extends Vue {
  created () {
    this.$store.commit('setStep', 2)
    this.$root.$emit('page-item-init', 'step2')
    this.$v.$touch()
    this.$root.$on('locale-changed', (value: string) => {
      this.validatorsOptions = this.getValidatorOptions()
    })
    this.$root.$on('json-config-changed', (cfg: any) => {
      this.config = cfg.protocol
    })
  }

  get errorClass () {
    return 'bg-yellow-200 border-yellow-300'
  }

  @Watch('$v.$anyError')
  errorChanged (newVal: string) {
    this.$root.$emit('any-error-step-2', newVal)
  }

  step = 2
  config: ProtocolConfig = this.$store.getters.localStorageState.protocol || {}
  historyType = HistoryType
  serverType = this.$store.getters.localStorageState.server.runAs
  validatorServerType = ServerType.VALIDATOR
  mainnetNetwork = Network.MAIN
  hugeNodeSize = NodeSize.HUGE
  networkOptions = [
    getSelectOption('Devnet', Network.DEV, Network.DEV),
    getSelectOption('Testnet', Network.TEST, Network.TEST),
    getSelectOption('Mainnet', Network.MAIN, Network.MAIN)
  ]

  validatorsOptions = this.getValidatorOptions()

  knownSitesOptions = {
    devnet: appConfig.sites.devnet.map(site => (getSelectOption(site, site, site))),
    testnet: appConfig.sites.testnet.map(site => (getSelectOption(site, site, site))),
    mainnet: appConfig.sites.mainnet.map(site => (getSelectOption(site, site, site)))
  }

  nodeSizeOptions = [
    getSelectOption('Tiny', NodeSize.TINY, NodeSize.TINY),
    getSelectOption('Small', NodeSize.SMALL, NodeSize.SMALL),
    getSelectOption('Medium', NodeSize.MEDIUM, NodeSize.MEDIUM),
    getSelectOption('Huge', NodeSize.HUGE, NodeSize.HUGE)
  ]

  saveCfg () {
    this.$store.commit('saveConfig', {
      key: 'protocol',
      cfg: this.config
    })
  }

  getValidatorOptions () {
    return [
      {
        name: i18n.t('protocol.labels.knownsites'),
        value: ValidatorListType.KNOWNSITES,
        id: 'knownSitesAndKeys'
      }
      // TODO: Bring these options back, removing for now.
      // {
      //   name: 'Define Validator Sites & Keys Manually',
      //   value: ValidatorListType.OWNSITES,
      //   id: 'ownSitesAndKeys'
      // },
      // {
      //   name: 'Define my own UNL',
      //   value: 'manual',
      //   id: 'manualUNL'
      // }
    ]
  }

  capitalizeFirstLetter (value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  nodeSizeChange (value: NodeSize) {
    this.config.nodeSize = value
    this.saveCfg()
  }

  validatorsListTypeChange (value: string) {
    this.config.validators.type = value
    this.saveCfg()
  }

  validatorsListChange (value: ValidatorListType) {
    this.config.validators.list = value
    this.saveCfg()
  }

  networkChange (value: Network) {
    this.config.network = value
    this.saveCfg()
    this.$root.$emit('page-item-select', `${value}`)
  }

  historyChange (value: string, historyType: HistoryType) {
    if (historyType !== HistoryType.SOME && this.$v.config.history!.ledgers.$error) this.config.history.ledgers = 256
    this.config.history.type = historyType
    this.saveCfg()
    this.$root.$emit('page-item-select', `ledgerHistory${this.capitalizeFirstLetter(historyType)}`)
  }

  itemFocus (value: string) {
    this.$root.$emit('page-item-focus', value)
  }

  itemSelect (value: string) {
    this.saveCfg()
    this.$root.$emit('page-item-select', `${value}`)
  }
}
</script>
