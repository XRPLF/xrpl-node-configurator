import Vue from 'vue'
import Router from 'vue-router'

import { setPageTitleMiddleware } from './middlewares'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'hash',
  routes
})

router.beforeEach(setPageTitleMiddleware)

export default router
