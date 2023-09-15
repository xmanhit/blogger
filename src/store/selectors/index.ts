import { RootState } from '..'

export const getPagination = (state: RootState): number[] => {
  const { total, limit } = state.article
  const length = Math.ceil(total / limit)
  return Array.from({ length }, (_, i) => i + 1)
}
