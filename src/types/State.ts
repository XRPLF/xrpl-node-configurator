import { ServerConfig } from './ServerConfig'
import { ProtocolConfig } from './ProtocolConfig'
import { StorageConfig } from './StorageConfig'
import { SslConfig } from './SslConfig'
import { SettingsConfig } from './SettingsConfig'

export interface State {
  currentStep: number,
  config: {
    server: ServerConfig,
    protocol: ProtocolConfig,
    storage: StorageConfig,
    ssl: SslConfig,
    settings: SettingsConfig
  },
  locale: string
}
