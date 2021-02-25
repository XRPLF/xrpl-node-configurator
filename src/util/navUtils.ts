export function getPathFromStepNumber (stepNumber: number): string {
  let path = '/'
  switch (stepNumber) {
    case 1:
      path = '/'
      break
    case 2:
      path = '/protocol'
      break
    case 3:
      path = '/storage'
      break
    case 4:
      path = '/ssl'
      break
    case 5:
      path = '/settings'
      break
    case 6:
      path = '/finished'
      break
    default:
      break
  }
  return path
}
