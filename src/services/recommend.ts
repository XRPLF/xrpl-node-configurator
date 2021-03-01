import { ConfigGroup, ServerType, DatabaseType, NodeSize, Network } from '@/enums'

interface Recommendation {
  name: string;
  fn: Function;
}

const serverRecs: Array<Recommendation> = [
  {
    name: 'rec0001',
    fn: rec0001
  }
]

const storageRecs: Array<Recommendation> = [
  {
    name: 'rec0002',
    fn: rec0002
  },
  {
    name: 'rec0005',
    fn: rec0005
  }
]

const protocolRecs: Array<Recommendation> = [
  {
    name: 'rec0003',
    fn: rec0003
  }
]

const sslRecs: Array<Recommendation> = []

const settingsRecs: Array<Recommendation> = [
  {
    name: 'rec0004',
    fn: rec0004
  }
]

const _getRecsForGroup = (group: ConfigGroup): Array<Recommendation> => {
  switch (group) {
    case ConfigGroup.SERVER:
      return serverRecs
    case ConfigGroup.PROTOCOL:
      return protocolRecs
    case ConfigGroup.STORAGE:
      return storageRecs
    case ConfigGroup.SSL:
      return sslRecs
    case ConfigGroup.SETTINGS:
      return settingsRecs
    case ConfigGroup.ALL:
      return [...serverRecs, ...protocolRecs, ...storageRecs, ...sslRecs, ...settingsRecs]
    default:
      throw new Error('Group not recognised')
  }
}

// "REC0001": "As your server is a validator, it only needs a small amount of history, use RocksDB for best performance.",
function rec0001 (config: any) {
  if (config.server.runAs === ServerType.VALIDATOR && config.storage.database.type === DatabaseType.NUDB) {
    return false
  } else {
    return true
  }
}

// "REC0002": "Validators should be configured to store no more than about 300,000 ledgers (approximately two weeks' worth of historical data) in the ledger store.",
function rec0002 (config: any) {
  if (config.protocol.history.ledgers > 300_000) {
    return false
  } else {
    return true
  }
}

// "REC0003": "Size 'huge' is the recommended size for production servers."
function rec0003 (config: any) {
  if (config.protocol.nodeSize !== NodeSize.HUGE && config.protocol.network === Network.MAIN) {
    return false
  } else {
    return true
  }
}

// "REC0004": "As you are running a Validator, you might want to run your server as a private peer."
function rec0004 (config: any) {
  if (config.server.runAs === ServerType.VALIDATOR && !config.settings.peer.private) {
    return false
  } else {
    return true
  }
}

// "REC0005": "If NuDB, SSD is required."
function rec0005 (config: any) {
  if (!config.storage.ssd && config.storage.database.type === DatabaseType.NUDB) {
    return false
  } else {
    return true
  }
}

const list = (group: ConfigGroup, config: any) : string[] => {
  const result: string[] = []
  const recommendations = _getRecsForGroup(group)
  recommendations.forEach((recommendation: Recommendation) => {
    if (!recommendation.fn(config)) {
      result.push(recommendation.name)
    }
  })
  return result
}

const recommend = {
  list
}

export default recommend
