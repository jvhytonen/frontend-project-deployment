import { ErrorState } from '../types/types'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formattedDate
}

export const findError = (errorStates: ErrorState[]) => {
  for (const errorState of errorStates) {
    if (errorState.error !== null) {
      return errorState.error
    }
  }
  return null
}
