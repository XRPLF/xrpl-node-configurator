import recommend from '../recommend'
import { ConfigGroup } from '../../enums'
import 'jest'
import validatorWithRocksDB from './fixtures/validatorWithRocksDB.json'
import validatorWithALotOfLedgers from './fixtures/validatorWithALotOfLedgers.json'
import productionServerWithTinySize from './fixtures/productionServerWithTinySize.json'
import validatorBroadcastAddress from './fixtures/validatorBroadcastAddress.json'
import nudbServer from './fixtures/nudbServer.json'

test('rec0001, validator', () => {
  const result = recommend.list(ConfigGroup.ALL, validatorWithRocksDB)
  expect(1).toBe(result.length)
  expect(result[0].name).toBe('rec0001')
})

test('rec0002, validator', () => {
  const result = recommend.list(ConfigGroup.ALL, validatorWithALotOfLedgers)
  expect(1).toBe(result.length)
  expect(result[0].name).toBe('rec0002')
})

test('rec0003, validator', () => {
  const result = recommend.list(ConfigGroup.ALL, productionServerWithTinySize)
  expect(1).toBe(result.length)
  expect(result[0].name).toBe('rec0003')
})

test('rec0004, validator', () => {
  const result = recommend.list(ConfigGroup.ALL, validatorBroadcastAddress)
  expect(1).toBe(result.length)
  expect(result[0].name).toBe('rec0004')
})

test('rec0005, ssd', () => {
  const result = recommend.list(ConfigGroup.ALL, nudbServer)
  expect(1).toBe(result.length)
  expect(result[0].name).toBe('rec0005')
})
