import { ClearItem, GetItem, StoreItem } from '../models'

export const storeItem: StoreItem = (item) => {
  const [itemName, itemValue] = Object.entries(item)[0]
  localStorage[itemName] = itemValue
}

export const getItem: GetItem = (item) => {
  return localStorage.getItem(item)
}

export const clearItem: ClearItem = (item) => {
  localStorage.removeItem(item)
}
