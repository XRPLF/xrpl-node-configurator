export default function directive (el: any, binding: any) {
  if (binding.value !== binding.oldValue) { // change debounce only if interval has changed
    el.oninput = directive.debounce((evt: any) => {
      el.dispatchEvent(new Event('debounce-change'))
    }, parseInt(binding.value) || 500)
  }
}

function debounce (fn: any, delay: any) {
  let timeoutID: any = null
  return () => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      fn.apply(this, arguments)
    }, delay)
  }
}

directive.debounce = debounce
