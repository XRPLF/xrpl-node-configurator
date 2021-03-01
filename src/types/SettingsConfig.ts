import { LogLevel } from '@/enums'

export interface SettingsConfig {
  peer: {
    private: boolean
  },
  signing: {
    support: boolean
  },
  connections: {
    incoming: number,
    outgoing: number
  },
  log: {
    level: LogLevel,
    logFilePath: string
  }
}
