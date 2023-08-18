import { ErrorState, IsLoadingState } from '../types/types'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formattedDate
}
export const showYear = (dateString: string) => {
  return dateString.substring(0, 4)
}
// App.tsx will gather all loading states from slices. If there is "isloading:true" in one of them, it will be returned.
export const findLoadingStates = (states: IsLoadingState[]): boolean => {
  return states.some((state) => state.isLoading)
}
