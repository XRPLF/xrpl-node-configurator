import jsonSchema from '../../cfg/schema.json'
import { validate as validateSchema, ValidatorResult } from 'jsonschema'

const mustBeFilePath = (value: string) => /^(\/[\w^ ]+)+\/?([\w.])+[^.]$/i.test(value)
const mustBeDirPath = (value: string) => /^(\/[\w^ ]+)+\/?$/i.test(value)
const mustbeValidDomain = (value: string) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/i.test(value)

const jsonWithSchema = (data: any) : ValidatorResult => {
  return validateSchema(data, jsonSchema)
}

const mustBeDirOrFilePath = (value: string) : boolean => {
  return (mustBeFilePath(value) || mustBeDirPath(value))
}

const validate = {
  jsonWithSchema,
  mustBeDirOrFilePath,
  mustBeFilePath,
  mustBeDirPath,
  mustbeValidDomain
}

export default validate
