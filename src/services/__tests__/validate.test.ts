import validate from '../validate'
import badJsonSchema from './fixtures/badJsonSchema.json'
import validatorBroadcastAddress from './fixtures/validatorBroadcastAddress.json'
import 'jest'

test('mustBeDirOrFilePath, bad', () => {
  const result = validate.mustBeDirOrFilePath('asdad11_**')
  expect(result).toBe(false)
})

test('mustBeDirOrFilePath, file name', () => {
  const result = validate.mustBeDirOrFilePath('test.json')
  expect(result).toBe(false)
})

test('mustBeDirOrFilePath, file path', () => {
  const result = validate.mustBeDirOrFilePath('/test.json')
  expect(result).toBe(true)
})

test('mustBeDirOrFilePath, path', () => {
  const result = validate.mustBeDirOrFilePath('/some/path/to/file')
  expect(result).toBe(true)
})

test('jsonWithSchema, good config', () => {
  const result = validate.jsonWithSchema(validatorBroadcastAddress)
  expect(result.errors.length).toBe(0)
})

test('jsonWithSchema, ledger string instead of number', () => {
  const result = validate.jsonWithSchema(badJsonSchema)
  expect(result.errors.length).toBe(1)
})

test('mustbeValidDomain, valid domain', () => {
  const result = validate.mustbeValidDomain('xrpl.org')
  expect(result).toBe(true)
})

test('mustbeValidDomain, valid subdomain', () => {
  const result = validate.mustbeValidDomain('start.xrpl.org')
  expect(result).toBe(true)
})

test('mustbeValidDomain, invalid domain', () => {
  const result = validate.mustbeValidDomain('1dot')
  expect(result).toBe(false)
})
