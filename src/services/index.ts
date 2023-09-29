import { ClearItem, GetItem, IUser, StoreItem } from '../models'

// localStorage
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

// sessionStorage
export const sessionStoreItem: StoreItem = (item) => {
  const [itemName, itemValue] = Object.entries(item)[0]
  sessionStorage[itemName] = itemValue
}

export const getSessionItem: GetItem = (item) => {
  return sessionStorage.getItem(item)
}

export const sessionClearItem: ClearItem = (item) => {
  sessionStorage.removeItem(item)
}

// auth

export const isAuthenticated = (): boolean => {
  const token = getItem('token')
  return token ? true : false
}

export const currentUser = (): IUser | null => {
  const cUser = getSessionItem('currentUser')
  const user = cUser ? JSON.parse(cUser as string) : null
  return user
}
