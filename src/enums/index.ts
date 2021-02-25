export enum ServerType {
  ALL = 'allPurposeServer',
  VALIDATOR = 'validatorServer',
  HUB = 'hubServer',
  API = 'apiServer',
  FULLHISTORY = 'fullHistoryServer',
  DEVELOPMENT = 'developmentServer'
}

export enum HistoryType {
  SOME = 'some',
  FULL = 'full',
  NONE = 'none'
}

export enum NodeSize {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  HUGE = 'huge'
}

export enum Network {
  DEV = 'devnet',
  TEST = 'testnet',
  MAIN = 'mainnet'
}

export enum ValidatorListType {
  KNOWNSITES = 'knownsites',
  OWNSITES = 'ownsites'
}

export enum DatabaseType {
  NUDB = 'nudb',
  ROCKSDB = 'rocksdb'
}

export enum LogLevel {
  DEBUG = 'debug',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  FATAL = 'fatal'
}

export enum ConfigGroup {
  SERVER = 'server',
  PROTOCOL = 'protocol',
  STORAGE = 'storage',
  SSL = 'ssl',
  SETTINGS = 'settings',
  ALL = 'all'
}

export enum ProtocolType {
  PEER = 'peer',
  WSPUBLIC = 'wsPublic',
  WSADMIN = 'wsAdmin',
  JSONRPC = 'jsonRpc',
  GRPC = 'grpc'
}
