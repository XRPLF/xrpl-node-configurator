<template>
  <div class="mb-14">
    <UiErrorBox :display="$v.$anyError"></UiErrorBox>
    <UiStepSection helpBox="databaseTypes" @item-focus="itemFocus">
      <!-- Database Type and Path / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="database">
        {{ $t('storage.labels.database') }}
      </label>
      <div class="flex">
        <div class="flex-auto">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
            {{ $t('storage.labels.databasetype') }}
          </label>
          <div class="relative">
            <UiDropdown @dropdown-change="databaseChange($event)" :options="this.databaseOptions" @item-select="itemSelect" @item-over="itemFocus" @item-focus="itemFocus" :selected="config.database.type" id="databaseType"></UiDropdown>
          </div>
        </div>
        <div class="flex-auto ml-4">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databasePath">
            {{ $t('storage.labels.databasepath') }}
          </label>
          <input @change="saveCfg()" v-model="config.database.path" class="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" :class="$v.config.database.path.$error && errorClass" id="databasePath" type="text" :placeholder="$t('storage.placeholders.databasepath')">
        </div>
      </div>
      <UiBox v-if="serverType === validatorServerType && config.database.type === nudbDatabaseType" icon="recommendation" type="warning" arrow="up" contentId="recommendations.rec0001" />
      <!-- / Database Type and Path -->
     </UiStepSection>
     <!-- SQLite / -->
    <UiStepSection helpBox="bookKeepingDatabases" @item-focus="itemFocus">
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="logs">
        {{ $t('storage.labels.bookkeeping') }}
      </label>
      <div class="w-full mt-3 mr-4">
        <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="bookKeepingPath">
          {{ $t('storage.labels.databasepath') }}
        </label>
        <input @change="saveCfg()" v-model="config.database.bookKeepingPath" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="bookKeepingPath" type="text" :class="$v.config.database.bookKeepingPath.$error && errorClass" :placeholder="$t('storage.placeholders.databasepath')">
      </div>
      </UiStepSection>
      <!-- / SQLite -->
     <UiStepSection v-if="historyType === historyTypes.SOME" helpBox="purge" @item-focus="itemFocus">
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="purge">
        {{ $t('storage.labels.purge') }}
      </label>
      <div class="flex">
        <!-- Automatic Purge / -->
        <div class="flex-auto">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="databaseType">
            {{ $t('storage.labels.automatic') }}
          </label>
          <div class="pt-3 flex">
            <div class="mr-2">
              <UiRadio @radio-change="purgeChange($event, 'onlineDelete')" :label="$t('forms.yes')" name="purgeData" value="online" :checked="config.purge.online.enabled"></UiRadio>.
            </div>
            <div class="mb-2 text-right text-gray-700 md:mb-0">{{ $t('storage.labels.keep') }}</div>
            <div class="w-1/4 pr-1 mb-2 ml-1 md:mb-0 -mt-3">
              <input @change="saveCfg()" class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" v-model.number="config.purge.online.ledgers" :class="$v.config.purge.online.ledgers.$error && errorClass" id="onlineDelete" type="text" placeholder="256">
            </div>
            <div class="flex-auto pr-3 mb-6 text-left text-gray-700 md:mb-0">
              {{ $t('storage.labels.ledgers') }}
            </div>
          </div>
          <div class="flex py-3">
            <UiRadio @radio-change="purgeChange($event, 'no')" :label="$t('forms.no')" name="purgeData" value="none" :checked="config.purge.none"></UiRadio>
          </div>
        </div>
        <!-- / Automatic Purge -->
        <!-- Advisory Deletion / -->
        <div class="flex-auto w-4/6 ml-4" v-if="historyType === historyTypes.SOME">
          <label class="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" for="advisoryDelete">
            {{ $t('storage.labels.advisorydeletion') }}
          </label>
          <div class="pb-3 pt-3">
            <UiCheckbox @checkbox-change="advisoryChange($event)" :label="$t('storage.labels.datadelete')" id="advisoryDelete" name="advisoryDelete" value="advisory" :checked="config.purge.advisory"></UiCheckbox>
          </div>
        </div>
      </div>
      <!-- / Advisory Deletion -->
     </UiStepSection>
     <UiStepSection helpBox="ssd" @item-focus="itemFocus">
      <!-- SSD / -->
      <label class="block mb-2 font-bold tracking-wide text-teal-500 uppercase text-md" for="ssd">
        {{ $t('storage.labels.ssd') }}
      </label>
      <div class="w-full">
        <UiCheckbox @checkbox-change="ssdChange($event)" :label="$t('storage.labels.usingSsd')" name="ssd" id="ssd" :value="config.ssd" :checked="config.ssd"></UiCheckbox>
      </div>
      <UiBox v-if="config.database.type === nudbDatabaseType && !config.ssd" icon="recommendation" type="warning" arrow="up" contentId="recommendations.rec0005" />
      <!-- / SSD -->
    </UiStepSection>
  </div>
</template>

<script lang="ts">
import UiStepSection from '@/components/custom/UiStepSection.vue'
import UiDropdown from '@/components/custom/UiDropdown.vue'
import UiRadio from '@/components/custom/UiRadio.vue'
import UiBox from '@/components/custom/UiBox.vue'
import UiCheckbox from '@/components/custom/UiCheckbox.vue'
import UiErrorBox from '@/components/custom/UiErrorBox.vue'
import { DatabaseType, HistoryType, ServerType } from '@/enums'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { required, numeric, requiredIf } from 'vuelidate/lib/validators'
// eslint-disable-next-line no-unused-vars
import { StorageConfig } from '@/types/StorageConfig'

@Component({
  name: 'Step3',
  components: {
    UiStepSection,
    UiDropdown,
    UiRadio,
    UiBox,
    UiCheckbox,
    UiErrorBox
  },
  validations: {
    config: {
      purge: {
        online: {
          enabled: {
            required
          },
          ledgers: {
            numeric,
            required: requiredIf(vm => {
              return vm.enabled === true
            })
          }
        },
        none: {
          required
        },
        advisory: {
          required
        }
      },
      database: {
        type: {
          required
        },
        path: {
          required
        },
        bookKeepingPath: {
          required
        }
      }
    }
  }
})
export default class Step3 extends Vue {
  created () {
    this.$store.commit('setStep', 3)
    this.$root.$emit('page-item-init', 'step3')
    this.$v.$touch()
    this.$root.$on('json-config-changed', (cfg: any) => {
      this.config = cfg.storage
    })
  }

  step = 3
  config: StorageConfig = this.$store.getters.localStorageState.storage || {}
  historyType = this.$store.getters.localStorageState.protocol.history.type
  historyTypes = HistoryType
  serverType = this.$store.getters.localStorageState.server.runAs
  validatorServerType = ServerType.VALIDATOR
  nudbDatabaseType = DatabaseType.NUDB
  databaseOptions = [
    {
      name: 'NuDB',
      value: DatabaseType.NUDB,
      id: 'nudb'
    },
    {
      name: 'RocksDB',
      value: DatabaseType.ROCKSDB,
      id: 'rocksdb'
    }
  ]

  get errorClass () {
    return 'bg-yellow-200 border-yellow-300'
  }

  @Watch('$v.$anyError')
  errorChanged (newVal: string) {
    this.$root.$emit('any-error-step-3', newVal)
  }

  saveCfg () {
    this.$store.commit('saveConfig', {
      key: 'storage',
      cfg: this.config
    })
  }

  purgeChange (event: string, value: string) {
    if (value === 'onlineDelete') {
      this.config.purge.online.enabled = true
      this.config.purge.none = false
    } else {
      this.config.purge.online.enabled = false
      this.config.purge.none = true
    }
    this.saveCfg()
  }

  advisoryChange (event: boolean) {
    this.config.purge.advisory = event
    this.saveCfg()
  }

  databaseChange (value: DatabaseType) {
    this.config.database.type = value
    this.saveCfg()
  }

  ssdChange (value: boolean) {
    this.config.ssd = value
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
