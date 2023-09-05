import { ErrorState } from '../types/reduxTypes'

// App.tsx will gather all error states from slices. If there is an error in one of them, it will be returned and showed on Modal.
export const findError = (errorStates: ErrorState[]) => {
  for (const errorState of errorStates) {
    if (errorState.error !== null) {
      return errorState.error
    }
  }
  return null
}
// Centralized error handler for all API calls.
export const apiErrorHandler = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json()
    const errorMessage = errorResponse.error
    throw new Error(errorMessage)
  }
}
