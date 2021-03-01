<template>
  <div class="mb-14">
    <UiErrorBox :display="$v.$anyError"></UiErrorBox>
    <UiStepSection helpBox="serverTypes" @item-focus="itemFocus">
      <!-- Server Type / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="serverType">
        {{ $t('server.labels.server') }}
      </label>
      <div class="flex">
        <div class="flex-auto">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
            {{ $t('server.labels.type') }}
          </label>
          <div class="relative">
            <UiDropdown :options="serverTypeOptions" @dropdown-change="itemSelect" @item-over="itemFocus" @item-focus="itemFocus" :selected="config.runAs" id="serverType"></UiDropdown>
          </div>
        </div>
        <div class="flex-auto ml-4">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databasePath">
            {{ $t('server.labels.domain') }}
            <span class="text-gray-400">({{ $t('forms.optional') }})</span>
          </label>
          <input @change="saveCfg()" v-model="config.domain" class="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.domain.$error && errorClass" id="domain" type="text" :placeholder="$t('server.placeholders.domain')">
        </div>
      </div>
      <!-- / Server Type -->
     </UiStepSection>
     <UiStepSection helpBox="serverProtocols" @item-focus="itemFocus">
        <!-- Protocols and ports / -->
        <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md">
          {{ $t('server.labels.protocolsandports') }}
        </label>
        <div class="flex mb-6 md:mb-0">
          <div class="w-2/6 pr-3 mb-6 md:mb-0">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {{ $t('server.labels.protocol') }}
            </label>
          </div>
          <div class="w-1/6 pr-3 mb-6 text-center md:mb-0">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {{ $t('server.labels.port') }}
            </label>
          </div>
          <div class="w-1/6 pr-3 mb-6 text-center md:mb-0">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {{ $t('server.labels.ip') }}
            </label>
          </div>
          <div class="w-1/6 pr-3 text-center md:mb-0">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {{ $t('server.labels.secure') }}
            </label>
          </div>
          <div class="w-1/6 pr-3 text-center md:mb-0">
            <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
              {{ $t('server.labels.admin') }}
            </label>
          </div>
        </div>
        <!-- http / -->
        <!-- peer / -->
        <label class="flex pt-2 pb-2 mt-2 bg-blue-100 border-t-2 md:mb-0" @mouseover="itemFocus('serverProtocolsPeer')">
          <div class="w-2/6 py-3 pl-5 pr-3 md:mb-0">
            {{ $t('server.labels.peer') }}
          </div>
          <div class="w-1/6 pr-3 md:mb-0" v-if="config.protocols.peer.enabled">
            <input @change="saveCfg()" v-model.number="config.protocols.peer.port" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.peer.port.$error && errorClass" id="peerPort" type="text" placeholder="2459">
          </div>
          <div class="md:w-1/6 md:mb-0" v-if="config.protocols.peer.enabled">
            <input @change="saveCfg()" v-model.trim="config.protocols.peer.ip" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.peer.ip.$error && errorClass" id="peerIp" type="text" placeholder="127.0.0.1">
          </div>
        </label>
        <!-- / peer -->
        <!-- wsPublic / -->
        <label class="flex pt-2 pb-2 border-t-2 md:mb-0" :class="(config.runAs === 'validatorServer') ? 'bg-gray-200': ''" @mouseover="itemFocus('serverProtocolsWsPublic')">
          <div class="w-2/6 py-3 pr-3 md:mb-0">
            <UiCheckbox v-if="config.runAs !== 'validatorServer'" @checkbox-change="protocolEnableChange($event, protocolTypeWsPublic)" :label="$t('server.labels.wspublic')" name="protocolSupported" id="protocolSupportedWsPublic" value="wsPublic" :checked="config.protocols.wsPublic.enabled"></UiCheckbox>
            <span class="pl-5 pr-3 text-gray-500" v-if="config.runAs === 'validatorServer'">
            {{ $t('server.labels.wspublic') }}
            </span>
          </div>
          <div class="w-1/6 pr-3 md:mb-0" v-if="config.protocols.wsPublic.enabled && config.runAs !== 'validatorServer'">
            <input @change="saveCfg()" v-model.number="$v.config.protocols.wsPublic.port.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.wsPublic.port.$error && errorClass" id="wsPublicPort" type="text" placeholder="6007">
          </div>
          <div class="md:w-1/6 md:mb-0" v-if="config.protocols.wsPublic.enabled && config.runAs !== 'validatorServer'">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.wsPublic.ip.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.wsPublic.ip.$error && errorClass" id="wsPublicIp" type="text" placeholder="127.0.0.1">
          </div>
          <div class="w-1/6 pt-2 pr-3 text-center md:mb-0" v-if="config.protocols.wsPublic.enabled && config.runAs !== 'validatorServer'">
            <UiCheckbox @checkbox-change="protocolSecureChange($event, protocolTypeWsPublic)" name="wsPublicSecure" value="true" :checked="config.protocols.wsPublic.secure"></UiCheckbox>
          </div>
        </label>
        <!-- / wsPublic -->
        <!-- wsAdmin / -->
        <label class="flex pt-2 pb-2 border-t-2 md:mb-0" @mouseover="itemFocus('serverProtocolsWsAdmin')">
          <div class="w-2/6 py-3 pr-3 md:mb-0">
            <UiCheckbox @checkbox-change="protocolEnableChange($event, protocolTypeWsAdmin)" :label="$t('server.labels.wsadmin')" name="protocolSupported" id="protocolSupportedWsAdmin" value="wsAdmin" :checked="config.protocols.wsAdmin.enabled"></UiCheckbox>
          </div>
          <div class="w-1/6 pr-3 md:mb-0" v-if="config.protocols.wsAdmin.enabled">
            <input @change="saveCfg()" v-model.number="$v.config.protocols.wsAdmin.port.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.wsAdmin.port.$error && errorClass" id="wsAdminPort" type="text" placeholder="6008">
          </div>
          <div class="md:w-1/6 md:mb-0" v-if="config.protocols.wsAdmin.enabled">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.wsAdmin.ip.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.wsAdmin.ip.$error && errorClass" id="wsAdminIp" type="text" placeholder="127.0.0.1">
          </div>
          <div class="w-1/6 pt-2 pr-3 text-center md:mb-0" v-if="config.protocols.wsAdmin.enabled">
            <UiCheckbox @checkbox-change="protocolSecureChange($event, protocolTypeWsAdmin)" id="wsAdminSecure" name="wsAdminSecure" value="true" :checked="config.protocols.wsAdmin.secure"></UiCheckbox>
          </div>
          <div class="w-1/6 pr-3 text-center md:mb-0" v-if="config.protocols.wsAdmin.enabled">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.wsAdmin.admin.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.wsAdmin.admin.$error && errorClass" id="wsAdminAdmin" type="text" placeholder="127.0.0.1">
          </div>
        </label>
        <!-- / wsAdmin -->
        <!-- JSON RPC / -->
        <label class="flex pt-2 pb-2 border-t-2 md:mb-0" @mouseover="itemFocus('serverProtocolsRpc')">
          <div class="w-2/6 py-3 pt-2 pr-3 md:mb-0">
            <UiCheckbox @checkbox-change="protocolEnableChange($event, protocolTypeJsonRpc)" :label="$t('server.labels.jsonrpc')" name="protocolSupported" id="protocolSupportedJsonRpc" value="rpc" :checked="config.protocols.jsonRpc.enabled"></UiCheckbox>
          </div>
          <div class="w-1/6 pr-3 md:mb-0" v-if="config.protocols.jsonRpc.enabled">
            <input @change="saveCfg()" v-model.number="$v.config.protocols.jsonRpc.port.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="rpcPort" :class="$v.config.protocols.jsonRpc.port.$error && errorClass" type="text" placeholder="5005">
          </div>
          <div class="md:w-1/6 md:mb-0" v-if="config.protocols.jsonRpc.enabled">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.jsonRpc.ip.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="rpcIp" :class="$v.config.protocols.jsonRpc.ip.$error && errorClass" type="text" placeholder="127.0.0.1">
          </div>
          <div class="w-1/6 pt-2 pr-3 text-center md:mb-0" v-if="config.protocols.jsonRpc.enabled">
            <UiCheckbox @checkbox-change="protocolSecureChange($event, protocolTypeJsonRpc)" id="rpcSecure" name="rpcSecure" value="jsonrpc" :checked="config.protocols.jsonRpc.secure"></UiCheckbox>
          </div>
          <div class="w-1/6 pr-3 text-center md:mb-0" v-if="config.protocols.jsonRpc.enabled">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.jsonRpc.admin.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.protocols.jsonRpc.admin.$error && errorClass" id="rpcAdmin" type="text" placeholder="127.0.0.1">
          </div>
        </label>
        <!-- / JSON RPC -->
        <!-- gRPC / -->
        <label class="flex pt-2 border-t-2 md:mb-0" @mouseover="itemFocus('serverProtocolsGrpc')">
          <div class="w-2/6 py-3 pt-2 pr-3 md:mb-0">
            <UiCheckbox @checkbox-change="protocolEnableChange($event, protocolTypeGrpc)" :label="$t('server.labels.grpc')" name="protocolSupported" id="protocolSupportedGrpc" value="grpc" :checked="config.protocols.grpc.enabled"></UiCheckbox>
          </div>
          <div class="w-1/6 pr-3 md:mb-0" v-if="config.protocols.grpc.enabled">
            <input @change="saveCfg()" v-model.number="$v.config.protocols.grpc.port.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="grpcPort" :class="$v.config.protocols.grpc.port.$error && errorClass" type="text" placeholder="50051">
          </div>
          <div class="md:w-1/6 md:mb-0" v-if="config.protocols.grpc.enabled">
            <input @change="saveCfg()" v-model.trim="$v.config.protocols.grpc.ip.$model" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="grpcIp" :class="$v.config.protocols.grpc.ip.$error && errorClass" type="text" placeholder="127.0.0.1">
          </div>
        </label>
        <!-- / gRPC-->
      <!-- / Protocols and ports -->
    </UiStepSection>
  </div>
</template>

<script lang="ts">
import UiStepSection from '@/components/custom/UiStepSection.vue'
import UiCheckbox from '@/components/custom/UiCheckbox.vue'
import UiDropdown from '@/components/custom/UiDropdown.vue'
import UiErrorBox from '@/components/custom/UiErrorBox.vue'
import { required, ipAddress, between, numeric } from 'vuelidate/lib/validators'
// eslint-disable-next-line no-unused-vars
import { ServerType, ProtocolType } from '@/enums'
import { Component, Vue, Watch } from 'vue-property-decorator'
import i18n from '@/i18n'
import validate from '../services/validate'
// eslint-disable-next-line no-unused-vars
import { ServerConfig } from '@/types/ServerConfig'
import { getSelectOption } from '@/util/formUtils'

const valueShouldBeUnique = (value: any, list: Array<any>) => {
  const ocurrences = list.reduce((n, val) => { return n + (val === value) }, 0)
  return ocurrences < 2
}

const validateDomainIfPopulated = (value: string) => (value) ? validate.mustbeValidDomain(value) : true

@Component({
  name: 'Step1',
  components: {
    UiStepSection,
    UiCheckbox,
    UiDropdown,
    UiErrorBox
  },
  validations: {
    config: {
      domain: {
        validateDomainIfPopulated
      },
      protocols: {
        peer: {
          ip: {
            required,
            ipAddress
          },
          port: {
            required,
            numeric,
            between: between(0, 65535),
            mustBeUnique (value: any) {
              // @ts-ignore
              return valueShouldBeUnique(value, this.getPortList())
            }
          }
        },
        wsPublic: {
          ip: {
            required,
            ipAddress
          },
          port: {
            required,
            numeric,
            between: between(0, 65535),
            mustBeUnique (value: any) {
              // @ts-ignore
              return valueShouldBeUnique(value, this.getPortList())
            }
          }
        },
        wsAdmin: {
          ip: {
            required,
            ipAddress
          },
          port: {
            required,
            numeric,
            between: between(0, 65535),
            mustBeUnique (value: any) {
              // @ts-ignore
              return valueShouldBeUnique(value, this.getPortList())
            }
          },
          admin: {
            ipAddress
          }
        },
        jsonRpc: {
          ip: {
            required,
            ipAddress
          },
          port: {
            required,
            numeric,
            between: between(0, 65535),
            mustBeUnique (value: any) {
              // @ts-ignore
              return valueShouldBeUnique(value, this.getPortList())
            }
          },
          admin: {
            ipAddress
          }
        },
        grpc: {
          ip: {
            required,
            ipAddress
          },
          port: {
            required,
            numeric,
            between: between(0, 65535),
            mustBeUnique (value: any) {
              // @ts-ignore
              return valueShouldBeUnique(value, this.getPortList())
            }
          }
        }
      }
    }
  }
})
export default class Step1 extends Vue {
  config: ServerConfig = this.$store.getters.localStorageState.server || {}
  locale: String = this.$store.getters.localStorageLocale || i18n.locale
  serverTypeOptions = this.getServerOptions()
  protocolTypePeer = ProtocolType.PEER
  protocolTypeWsPublic = ProtocolType.WSPUBLIC
  protocolTypeWsAdmin = ProtocolType.WSADMIN
  protocolTypeJsonRpc = ProtocolType.JSONRPC
  protocolTypeGrpc = ProtocolType.GRPC

  created () {
    this.$store.commit('setStep', 1)
    this.$root.$emit('page-item-init', 'step1')
    this.$v.$touch()
    this.$root.$on('locale-changed', (value: string) => {
      this.serverTypeOptions = this.getServerOptions()
    })
    this.$root.$on('json-config-changed', (cfg: any) => {
      this.config = cfg.server
    })
  }

  get errorClass () {
    return 'bg-yellow-200 border-yellow-300'
  }

  getServerOptions () {
    return [
      getSelectOption(i18n.t('server.labels.dedicatedvalidator').toString(), ServerType.VALIDATOR, ServerType.VALIDATOR),
      getSelectOption(i18n.t('server.labels.hubserver').toString(), ServerType.HUB, ServerType.HUB),
      getSelectOption(i18n.t('server.labels.fullhistoryserver').toString(), ServerType.FULLHISTORY, ServerType.FULLHISTORY),
      getSelectOption(i18n.t('server.labels.dedicatedapiserver').toString(), ServerType.API, ServerType.API),
      getSelectOption(i18n.t('server.labels.allpurposeserver').toString(), ServerType.ALL, ServerType.ALL),
      getSelectOption(i18n.t('server.labels.developmentserver').toString(), ServerType.DEVELOPMENT, ServerType.DEVELOPMENT)
    ]
  }

  @Watch('$v.$anyError')
  errorChanged (newVal: any) {
    this.$root.$emit('any-error-step-1', newVal)
  }

  getPortList () {
    return [
      this.config.protocols.peer.port,
      this.config.protocols.wsPublic.port,
      this.config.protocols.wsAdmin.port,
      this.config.protocols.jsonRpc.port,
      this.config.protocols.grpc.port
    ]
  }

  saveCfg () {
    this.$store.commit('saveConfig', {
      key: 'server',
      cfg: this.config
    })
  }

  protocolSecureChange (value: any, protocol: ProtocolType) {
    this.config.protocols[protocol].secure = value
    this.saveCfg()
  }

  protocolEnableChange (value: any, protocol: ProtocolType) {
    this.config.protocols[protocol].enabled = value
    this.saveCfg()
  }

  itemFocus (value: any): void {
    this.$root.$emit('page-item-focus', value)
  }

  itemSelect (value: any): void {
    this.config.runAs = value
    this.config.protocols.wsPublic.enabled = (value !== ServerType.VALIDATOR)
    this.saveCfg()
    this.$root.$emit('page-item-select', `${value}`)
  }
}
</script>
