const validatorFileName = 'validator'
const installFileName = 'install'

const get = async (validator: boolean, locale: string) : Promise<string> => {
  const install = require(`../../public/content/txt/${installFileName}_${locale}.txt`)
  const result = []
  result.push(install.default)
  if (validator) {
    const validator = require(`../../public/content/txt/${validatorFileName}_${locale}.txt`)
    result.push(validator.default)
  }
  return result.join('')
}

const instructions = {
  get
}

export default instructions
