import React from 'react'
import { UploadImageType } from '../../../features/types/types'

function UploadImage({ onImageUpload }: UploadImageType) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement
    const image = fileInput.files?.[0]
    if (image) {
      // Image upload is done in the parent component together with handling all the other data as well.
      onImageUpload(image, image.name)
    }
  }

  return (
    <>
      {/* Styling by chatGPT */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
          Select a cover image: (width:500 px, height:670 px)
        </label>
        <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded shadow-md tracking-wide border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Choose a file
          <input
            className="hidden"
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </>
  )
}

export default UploadImage
