import step1Page from '../pages/Step1.vue'
import step2Page from '../pages/Step2.vue'
import step3Page from '../pages/Step3.vue'
import step4Page from '../pages/Step4.vue'
import step5Page from '../pages/Step5.vue'
import step6Page from '../pages/Step6.vue'
import notFoundPage from '../pages/NotFound.vue'
import rippledCfg from '../output/RippledCfg.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: step1Page,
    meta: {
      title: `${DOMAIN_TITLE} | Server`,
      layout: 'app'
    }
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: step2Page,
    meta: {
      title: `${DOMAIN_TITLE} | Protocol`,
      layout: 'app'
    }
  },
  {
    path: '/storage',
    name: 'storage',
    component: step3Page,
    meta: {
      title: `${DOMAIN_TITLE} | Storage`,
      layout: 'app'
    }
  },
  {
    path: '/ssl',
    name: 'ssl',
    component: step4Page,
    meta: {
      title: `${DOMAIN_TITLE} | SSL`,
      layout: 'app'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: step5Page,
    meta: {
      title: `${DOMAIN_TITLE} | Settings`,
      layout: 'app'
    }
  },
  {
    path: '/finished',
    name: 'finished',
    component: step6Page,
    meta: {
      title: `${DOMAIN_TITLE} | Finished`,
      layout: 'app'
    }
  },
  {
    path: '/result',
    name: 'result',
    component: rippledCfg,
    meta: {
      title: `${DOMAIN_TITLE} | Result`,
      layout: 'result'
    }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
