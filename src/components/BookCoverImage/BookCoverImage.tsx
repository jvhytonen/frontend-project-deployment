import React from 'react'
import { S3IMAGEURL } from '../../features/utils/variables'
import { Book } from '../../features/types/reduxTypes'

function BookCoverImage({ imageUrl }: Partial<Book>) {
  return (
    <img
      className="w-5/6 object-contain rounded-lg md:max-w-[360px]"
      src={imageUrl ? S3IMAGEURL + imageUrl : '../defaultCover.jpg'}
      alt="Book cover"
    />
  )
}

export default BookCoverImage
