export const apiErrorHandler = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json()
    const errorMessage = errorResponse.error
    console.log(errorMessage)
    throw new Error(errorMessage)
  }
}
