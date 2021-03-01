import { SelectOption } from '@/types/SelectOption'

export function getSelectOption (name: string, value: string, id: string) {
  const result: SelectOption = {
    name,
    value,
    id
  }
  return result
}
