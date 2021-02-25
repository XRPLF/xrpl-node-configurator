export function setPageTitleMiddleware (to: any, from: any, next: any) {
  const pageTitle = to.matched.find((item: any) => item.meta.title)

  if (pageTitle) window.document.title = pageTitle.meta.title
  next()
}
