import { ServerType, Network, HistoryType } from '@/enums'
import * as appConfig from '../../cfg/app.json'

interface validatorKeysLists {
    [key: string]: string
}

const validatorLists: validatorKeysLists = appConfig.validatorKeysList
const singleLineBreak = '\n'
const doubleLineBreak = '\n\n'

const _getNetworkId = (network: Network) => {
  switch (network) {
    case Network.MAIN:
      return 0
    case Network.TEST:
      return 1
    case Network.DEV:
      return 2
    default:
      throw new Error('Network id not recognised')
  }
}

const _getHistoryValue = (type: HistoryType, ledgers: number) => {
  switch (type) {
    case HistoryType.FULL:
      return HistoryType.FULL
    case HistoryType.SOME:
      return ledgers
    case HistoryType.NONE:
      return 0
    default:
      throw new Error('History mode not recognised')
  }
}

const _generateValidatorSettings = (configuration: any = {}) => {
  const result = []
  const cfg = configuration.protocol
  result.push('[validator_list_sites]')
  result.push(singleLineBreak)
  cfg.validators.list.forEach((element: string) => {
    result.push(`https://${element}`)
    result.push(singleLineBreak)
  })
  result.push(singleLineBreak)
  result.push('[validator_list_keys]')
  result.push(singleLineBreak)
  cfg.validators.list.forEach((element: string) => {
    result.push(validatorLists[element])
    result.push(singleLineBreak)
  })
  return result
}

const _generateSettings = (configuration: any = {}) => {
  const result = []
  const cfg = configuration.settings
  
  result.push('[peers_in_max]')
  result.push(singleLineBreak)
  result.push(cfg.connections.incoming)
  result.push(doubleLineBreak)
  result.push('[peers_out_max]')
  result.push(singleLineBreak)
  result.push(cfg.connections.outgoing)
  result.push(doubleLineBreak)
  result.push('[rpc_startup]')
  result.push(singleLineBreak)
  result.push(`{ "command": "log_level", "severity": "${cfg.log.level}" }`)
  result.push(doubleLineBreak)
  if (cfg.peer.private) {
    result.push('[peer_private]')
    result.push(singleLineBreak)
    result.push('1')
    result.push(doubleLineBreak)
  }
  if (cfg.signing.support) {
    result.push('[signing_support]')
    result.push(singleLineBreak)
    result.push(cfg.signing.support)
    result.push(doubleLineBreak)
  }
  // Fee voting
  // result.push('[voting]')
  // result.push(singleLineBreak)
  // result.push('account_reserve=20000000')
  // result.push(singleLineBreak)
  // result.push('owner_reserve=5000000')
  // result.push(doubleLineBreak)
  return result
}

const _generateProtocol = (configuration: any = {}) => {
  const result = []
  const cfg = configuration.protocol
  result.push('[node_size]')
  result.push(singleLineBreak)
  result.push(cfg.nodeSize)
  result.push(doubleLineBreak)
  result.push('[ledger_history]')
  result.push(singleLineBreak)
  result.push(_getHistoryValue(cfg.history.type, cfg.history.ledgers))
  result.push(doubleLineBreak)
  result.push(`# ${cfg.network}`)
  result.push(singleLineBreak)
  result.push('[network_id]')
  result.push(singleLineBreak)
  result.push(_getNetworkId(cfg.network))
  result.push(doubleLineBreak)
  if (cfg.network === Network.DEV || cfg.network === Network.TEST) {
    result.push(singleLineBreak)
    result.push('[ips]')
    result.push(singleLineBreak)
    result.push(cfg.network === Network.DEV ? 's.devnet.rippletest.net 51235' : 's.testnet.rippletest.net 51235')
    result.push(doubleLineBreak)
  }
  result.push(singleLineBreak)
  result.push('[sntp_servers]')
  result.push(singleLineBreak)
  result.push('time.windows.com')
  result.push(singleLineBreak)
  result.push('time.apple.com')
  result.push(singleLineBreak)
  result.push('time.nist.gov')
  result.push(singleLineBreak)
  result.push('pool.ntp.org')
  result.push(doubleLineBreak)
  return result
}

const _generateStorage = (configuration: any = {}) => {
  const result = []
  result.push('[node_db]')
  result.push(singleLineBreak)
  const cfg = configuration.storage
  result.push(`type=${cfg.database.type}`)
  result.push(singleLineBreak)
  result.push(`path=${cfg.database.path}`)
  result.push(singleLineBreak)
  result.push(`online_delete=${(cfg.purge.online.enabled) ? cfg.purge.online.ledgers : 0}`)
  result.push(singleLineBreak)
  result.push(`advisory_delete=${(cfg.purge.advisory) ? 1 : 0}`)
  result.push(doubleLineBreak)
  result.push('[database_path]')
  result.push(singleLineBreak)
  result.push(cfg.database.bookKeepingPath)
  result.push(doubleLineBreak)
  return result
}

const _generateSsl = (configuration: any = {}) => {
  const result = []
  const cfg = configuration.ssl.client
  if (cfg.verify) {
    result.push('[ssl_verify]')
    result.push(singleLineBreak)
    result.push('1')
    result.push(doubleLineBreak)
    result.push('[ssl_verify_dir]')
    result.push(singleLineBreak)
    result.push(cfg.dirPath)
    result.push(doubleLineBreak)
    result.push('[ssl_verify_file]')
    result.push(singleLineBreak)
    result.push(cfg.filePath)
    result.push(doubleLineBreak)
  }
  return result
}

const _generateServer = (configuration: any = {}) => {
  const cfg: any = configuration.server
  const sslCfg: any = configuration.ssl.server
  const result: any = []
  result.push(`# Configured as ${cfg.runAs}`)
  result.push(doubleLineBreak)
  result.push('[server]')
  result.push(singleLineBreak)
  if (cfg.protocols.peer.enabled) result.push('peer') && result.push(singleLineBreak)
  if (cfg.protocols.wsPublic.enabled) result.push('websockets_public') && result.push(singleLineBreak)
  if (cfg.protocols.wsAdmin.enabled) result.push('websockets_admin') && result.push(singleLineBreak)
  if (cfg.protocols.jsonRpc.enabled) result.push('rpc') && result.push(singleLineBreak)

  // SSL Server
  if (sslCfg.enabled) {
    result.push(`ssl_cert=${sslCfg.certPath}`)
    result.push(singleLineBreak)
    result.push(`ssl_key=${sslCfg.keyPath}`)
    result.push(singleLineBreak)
  }

  if (cfg.runAs === ServerType.VALIDATOR) {
    result.push(`#Configured as ${cfg.runAs}`)
    result.push(singleLineBreak)
    result.push('[validator_token]')
    result.push(singleLineBreak)
    result.push('YOUR_TOKEN_HERE')
    result.push(singleLineBreak)
  }

  result.push(singleLineBreak)

  // Peer is always enabled
  // In stand-alone mode it's always off regardless of what the config file says.
  result.push('[peer]')
  result.push(singleLineBreak)
  result.push(`port = ${cfg.protocols.peer.port}`)
  result.push(singleLineBreak)
  result.push(`ip = ${cfg.protocols.peer.ip}`)
  result.push(singleLineBreak)
  result.push('protocol = peer')
  if (cfg.runAs === 'hubServer') {
    result.push(doubleLineBreak)
    result.push('# Hub servers might require higher number of Peer connections')
    result.push(singleLineBreak)
    result.push('limit = 100')
  }
  result.push(doubleLineBreak)

  if (cfg.protocols.wsPublic.enabled) {
    result.push('[websockets_public]')
    result.push(singleLineBreak)
    result.push(`port = ${cfg.protocols.wsPublic.port}`)
    result.push(singleLineBreak)
    result.push(`ip = ${cfg.protocols.wsPublic.ip}`)
    result.push(singleLineBreak)
    if (cfg.protocols.wsPublic.admin) {
      result.push('# Remote IPv4/6 address that are allowed to run administrative commands')
      result.push(singleLineBreak)
      result.push(`admin = ${cfg.protocols.wsPublic.admin}`)
      result.push(singleLineBreak)
    }
    result.push(`protocol = ${(cfg.protocols.wsPublic.secure) ? 'wss' : 'ws'}`)
    result.push(doubleLineBreak)
  }

  if (cfg.protocols.wsAdmin.enabled) {
    result.push('[websockets_admin]')
    result.push(singleLineBreak)
    result.push(`port = ${cfg.protocols.wsAdmin.port}`)
    result.push(singleLineBreak)
    result.push(`ip = ${cfg.protocols.wsAdmin.ip}`)
    result.push(singleLineBreak)
    if (cfg.protocols.wsAdmin.admin) {
      result.push('# Remote IPv4/6 address that are allowed to run administrative commands')
      result.push(singleLineBreak)
      result.push(`admin = ${cfg.protocols.wsAdmin.admin}`)
      result.push(singleLineBreak)
    }
    result.push(`protocol = ${(cfg.protocols.wsAdmin.secure) ? 'wss' : 'ws'}`)
    result.push(doubleLineBreak)
  }

  if (cfg.protocols.jsonRpc.enabled) {
    result.push('[rpc]')
    result.push(singleLineBreak)
    result.push(`port = ${cfg.protocols.jsonRpc.port}`)
    result.push(singleLineBreak)
    result.push(`ip = ${cfg.protocols.jsonRpc.ip}`)
    result.push(singleLineBreak)
    if (cfg.protocols.jsonRpc.admin) {
      result.push('# Remote IPv4/6 address that are allowed to run administrative commands')
      result.push(singleLineBreak)
      result.push(`admin = ${cfg.protocols.jsonRpc.admin}`)
      result.push(singleLineBreak)
    }
    result.push(`protocol = ${(cfg.protocols.jsonRpc.secure) ? 'https' : 'http'}`)
    result.push(doubleLineBreak)
  }

  if (cfg.protocols.grpc.enabled) {
    result.push('[port_grpc]')
    result.push(singleLineBreak)
    result.push(`port = ${cfg.protocols.grpc.port}`)
    result.push(singleLineBreak)
    result.push(`ip = ${cfg.protocols.grpc.ip}`)
    result.push(singleLineBreak)
    result.push('secure_gateway = 127.0.0.1')
    result.push(doubleLineBreak)
  }

  if (cfg.domain) {
    result.push('[server_domain]')
    result.push(singleLineBreak)
    result.push(cfg.domain)
    result.push(doubleLineBreak)
  }
  
  return result
}

/**
 * Generates the rippled.cfg content from the configuration passed
 * @param configuration
 * @return {{}}
 */
const generateRippledCfg = (configuration = {}) => {
  let result: any = []
  const header = [
    `# Generated with version ${require('../../lib/version')}`,
    doubleLineBreak
  ]
  const server = _generateServer(configuration)
  const protocol = _generateProtocol(configuration)
  const storage = _generateStorage(configuration)
  const ssl = _generateSsl(configuration)
  const settings = _generateSettings(configuration)
  result = result
    .concat(header)
    .concat(server)
    .concat(protocol)
    .concat(storage)
    .concat(ssl)
    .concat(settings)
  result.push(singleLineBreak)
  return result
}

/**
 * Generates the validators.txt content from the configuration passed
 * @param configuration
 * @return {{}}
 */
const generateValidatorsCfg = (configuration = {}) => {
  let result: any = []
  const header = [
    `# Generated with version ${require('../../lib/version')}`,
    doubleLineBreak
  ]
  const config = _generateValidatorSettings(configuration)
  result = result
    .concat(header)
    .concat(config)
  result.push(singleLineBreak)
  return result
}

const rippled = {
  generateRippledCfg,
  generateValidatorsCfg
}

export default rippled
