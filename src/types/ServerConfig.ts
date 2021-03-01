import { ServerType, ProtocolType } from '@/enums'
import { ProtocolProperties } from './ProtocolProperties'

export interface ServerConfig {
  runAs: ServerType,
  protocols: {
    [key: string]: ProtocolProperties;
  }
}
