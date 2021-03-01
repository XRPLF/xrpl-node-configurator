import { ServerConfig } from './ServerConfig'
import { ProtocolConfig } from './ProtocolConfig'
import { StorageConfig } from './StorageConfig'
import { SslConfig } from './SslConfig'
import { SettingsConfig } from './SettingsConfig'

export interface ConfigSection {
  cfg : ServerConfig | ProtocolConfig | StorageConfig | SslConfig | SettingsConfig;
}
