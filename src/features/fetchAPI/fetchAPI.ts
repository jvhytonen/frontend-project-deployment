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

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  const URL =
    'https://erfv9p79ya.execute-api.eu-central-1.amazonaws.com/dev/upload-image-s3-jvh/' + file.name
  const res = await fetch(URL, {
    method: 'POST',
    body: formData
  })
  const response = res.json()
  return response
}
