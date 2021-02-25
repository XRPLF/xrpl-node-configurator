import Vue from 'vue'

Vue.directive('numericOnly', {
  bind (el) {
    el.addEventListener('keyup', () => {
      const regex = /^[0-9]*$/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
      if (!regex.test(el.value)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
        el.value = el.value.slice(0, -1)
      }
    })
  }
})
