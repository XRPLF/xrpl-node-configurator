<template>
  <div class="p-4 mb-6">
    <div class="flex">
      <div class="w-1/5 h-12">
        <svg class="w-32 h-32 mr-2 -ml-1 text-green-500" viewBox="0 0 512 512" fill="currentColor">
          <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
      </div>
      <div class="w-4/5 px-3 mx-2">
        <div class="mb-2 text-xl font-bold">{{ $t('success.title') }}</div>
        <p class="text-base text-gray-700">
          {{ $t('success.desc1') }}
        </p>
        <ul class="mt-4 ml-4 text-gray-700">
          <li>
            <span class="text-green-600">config/</span><span class="text-blue-600 font-bold">rippled.cfg</span>:
            {{ $t('success.rippledcfg') }}
          </li>
          <li>
            <span class="text-green-600">config/</span><span class="text-blue-600 font-bold">validators.txt</span>:
            {{ $t('success.validatorstxt') }}
          </li>
          <li>
            <span class="text-blue-600 font-bold">cfg.json</span>:
            {{ $t('success.cfgjson') }}
          </li>
          <li>
            <span class="text-blue-600 font-bold">instructions.txt</span>:
            {{ $t('success.instructionstxt') }}
          </li>
        </ul>
        <p class="mt-3 text-gray-700">
          {{ $t('success.desc2') }}
        </p>
        <p class="mt-3">
          <code class="text-sm">
            /opt/ripple/bin/rippled server_info
          </code>
        </p>
        <p class="mt-4 text-base text-gray-700">
          {{ $t('success.desc3') }}
        </p>
        <p class="mt-4 text-base text-gray-700">
          {{ $t('success.desc4') }} <a class="text-blue-700" href="https://xrpl.org" target="_blank" :title="$t('success.desc5')">{{ $t('success.desc5') }} <i class="fas fa-external-link-alt"></i></a> {{ $t('success.desc6') }}:
        </p>
        <div class="py-4">
          <a href="https://xrpl.org/install-rippled.html" target="_blank" class="inline-block px-3 py-1 mr-2 text-sm font-semibold text-blue-500 bg-gray-200 rounded-full" :title="$t('success.link1')">{{ $t('success.link1') }} <i class="fas fa-external-link-alt"></i></a>
          <a href="https://xrpl.org/system-requirements.html" target="_blank" class="inline-block px-3 py-1 mr-2 text-sm font-semibold text-blue-500 bg-gray-200 rounded-full" :title="$t('success.link2')">{{ $t('success.link2') }} <i class="fas fa-external-link-alt"></i></a>
          <a href="https://xrpl.org/capacity-planning.html" target="_blank" class="inline-block px-3 py-1 mr-2 text-sm font-semibold text-blue-500 bg-gray-200 rounded-full" :title="$t('success.link3')">{{ $t('success.link3') }} <i class="fas fa-external-link-alt"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script language="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Step6'
})
export default class Step6 extends Vue {
  step = 6
  created () {
    this.$store.commit('setStep', 6)
    this.$root.$emit('page-item-init', 'step6')
  }

  mounted () {
    const prettyCodeScript = document.createElement('script')
    prettyCodeScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=desert')
    document.head.appendChild(prettyCodeScript)
  }
  
  itemFocus (value) {
    this.$root.$emit('page-item-focus', value)
  }
  
  itemSelect (value) {
    this.$root.$emit('page-item-select', `${value}`)
  }
}
</script>
