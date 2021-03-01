import { DatabaseType } from '@/enums'

export interface StorageConfig {
  purge: {
    online: {
      enabled: boolean,
      ledgers: number
    },
    none: boolean,
    advisory: boolean
  },
  ssd: boolean,
  database: {
    type: DatabaseType,
    path: string,
    bookKeepingPath: string
  }
}
