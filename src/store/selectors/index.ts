import { RootState } from '..'

export const getOffset = (state: RootState): number => {
  // const { page, limit } = state.article
  // return (page - 1) * limit
}

export const getPagination = (state: RootState): number[] => {
  const { total, limit } = state.article
  return Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
}
