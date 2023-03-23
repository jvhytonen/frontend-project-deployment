export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('An error occurred')
    }
    const books = response.json()
    return books
  } catch (err) {
    console.log(err)
  }
}
