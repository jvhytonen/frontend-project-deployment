export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('An error occurred')
    }
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
