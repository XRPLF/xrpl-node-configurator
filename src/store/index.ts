import Vue from 'vue'
import Vuex from 'vuex'

import { State } from '@/types/State'
import { ConfigSection } from '@/types/ConfigSection'

import appVersion from '../../lib/version'
import defaultConfig from '../../cfg/defaultConfig.json'

Vue.use(Vuex)

const STORAGE_KEY = 'xrpl-node-cfg'
const STEP_KEY = 'xrpl-node-step'
const LOCALE_KEY = 'xrpl-node-locale'
const APP_VERSION_KEY = 'xrpl-node-version'
const defaultLocale = 'en'

function clone (value: any) {
  return JSON.parse(JSON.stringify(value))
}

function saveCfgInLocalStorage (key: string, state: State, cfg: ConfigSection) {
  const config = clone(cfg)
  switch (key) {
    case 'server':
      state.config.server = config
      break
    case 'protocol':
      state.config.protocol = config
      break
    case 'storage':
      state.config.storage = config
      break
    case 'ssl':
      state.config.ssl = config
      break
    case 'settings':
      state.config.settings = config
      break
    default:
      throw new Error('Key not recognised')
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.config, null, '\t'))
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    currentStep: Number(localStorage.getItem(STEP_KEY) || 1),
    config: (localStorage.getItem(STORAGE_KEY)) ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') : defaultConfig,
    locale: localStorage.getItem(LOCALE_KEY) || defaultLocale
  },
  getters: {
    localStorageState: () => {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    },
    localStorageLocale: () => {
      return localStorage.getItem(LOCALE_KEY) || ''
    },
    localStorageStep: () => {
      return localStorage.getItem(STEP_KEY) || ''
    },
    localStorageAppVersion: () => {
      return localStorage.getItem(APP_VERSION_KEY) || ''
    }
  },
  mutations: {
    initialize: (state: State, initialState) => {
      const localVersion = localStorage.getItem(APP_VERSION_KEY)
      const localCfg = localStorage.getItem(STORAGE_KEY)
      if ((!localVersion || localVersion !== appVersion) || !localCfg) {
        state.config = initialState
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
        localStorage.setItem(APP_VERSION_KEY, appVersion)
      }
    },
    setStep: (state: State, step: number) => {
      state.currentStep = step
      localStorage.setItem(STEP_KEY, step.toString())
    },
    stepIncrement: (state: State) => {
      state.currentStep++
    },
    stepDecrement: (state: State) => {
      state.currentStep--
    },
    saveConfig: (state: State, { key, cfg }) => {
      saveCfgInLocalStorage(key, state, cfg)
    },
    saveLocale: (state: State, locale: string) => {
      state.locale = locale
      localStorage.setItem(LOCALE_KEY, locale)
    }
  }
})
