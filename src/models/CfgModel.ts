export default class CfgModel {
  createdAt: any;
  id: any;
  updatedAt: any;
  constructor (src = {}) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
    this.buildModel(src, this.schema)
  }

  get schema () {
    throw new Error('Model schema not defined.')
  }

  buildModel (src = {}, schema = {}) {
    Object.keys(schema).forEach(schemaProp => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const srcPropType = typeof src[schemaProp]
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (['number', 'boolean', 'string', 'object'].includes(srcPropType) && ![undefined, null].includes(src[schemaProp])) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[schemaProp] = src[schemaProp]
      } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[schemaProp] = schema[schemaProp]
      }
    })
  }

  baseClear () {
    delete this.id
    delete this.createdAt
    delete this.updatedAt

    Object.keys(this).forEach(key => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Array.isArray(this[key]) && !this[key].length) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        delete this[key]
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (['', undefined].includes(this[key])) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        delete this[key]
      }
    })

    return this
  }

  prepareCreate () {
    this.baseClear()
    return this
  }

  prepareUpdate () {
    this.baseClear()
    return this
  }
}
