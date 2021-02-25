import { HistoryType, ValidatorListType, NodeSize, Network } from '@/enums'

export interface ProtocolConfig {
  nodeSize: NodeSize,
  history: ProtocolHistory,
  validators: {
    type: string,
    list: ValidatorListType
  }
  network: Network
}

interface ProtocolHistory {
  type: HistoryType,
  ledgers: number
}
