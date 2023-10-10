import { AgnosticRouteObject } from '@remix-run/router'
import { matchRoutes, useLocation } from 'react-router-dom'
export function timeSince(date: Date): string {
  const today: Date = new Date()
  const seconds = Math.floor((+today - +date) / 1000)

  if (seconds < 29)
    // less than 30 seconds ago will show as 'Just now'
    return 'Just now'

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }

  let counter: number
  for (const i in intervals) {
    counter = Math.floor(seconds / intervals[i])
    if (counter > 0)
      if (counter === 1) {
        return `${counter} ${i} ago` // singular (1 day ago)
      } else {
        return `${counter} ${i}s ago` // plural (2 days ago)
      }
  }

  return 'Just now'
}

export function formatDate(date: Date): string {
  let formattedDate = date.toLocaleString('default', { month: 'short', day: '2-digit' })
  return formattedDate
}

export function formatFullDate(date: Date): string {
  interface IOptions {
    weekday?: 'long' | 'short' | 'narrow'
    year?: 'numeric'
    month?: 'long' | 'short' | 'narrow'
    day?: 'numeric'
    hour?: 'numeric'
    minute?: 'numeric'
    second?: 'numeric'
  }
  const options: IOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const formattedDate = date.toLocaleDateString('default', options)
  return formattedDate
}

export const isMatchRoutes = (routes: AgnosticRouteObject[]) => {
  const currentLocation = useLocation()
  const matches = matchRoutes(routes, currentLocation)

  for (const route of routes) {
    if (route.path === matches?.[0].route.path) {
      return true
    }
  }
  return false
}

export const textAreaAdjust = (element: any) => {
  const height = element.target.scrollHeight
  if (height > 600) {
    return (element.target.style.height = `600px`)
  }
  element.target.style.height = `${height}px`
}
