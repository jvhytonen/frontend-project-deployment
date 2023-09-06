import { Link, useNavigate } from 'react-router-dom'

import { S3IMAGEURL } from '../../features/utils/variables'
import Button from '../Button/Button'
import { BookIntroProps } from '../../features/types/componentTypes'

function BookIntro({ title, id, author, imageUrl }: BookIntroProps) {
  const navigate = useNavigate()
  return (
    <div className="my-0 ml-8 mr-auto py-2 sm:py-8 md:py-2 rounded-lg shadow-lg w-2/3 shadow-gray-200 bg-indigo-100">
      <div>
        <img
          src={imageUrl ? S3IMAGEURL + imageUrl : 'defaultCover.jpg'}
          className="rounded-t h-72 w-full object-contain"
        />
        <div className="p-4">
          <h3 className="text-lg text-center font-bold leading-relaxed text-gray-800">{title}</h3>
          <p className="leading-5 text-center text-gray-500">{author ? author.name : null}</p>
        </div>
      </div>
      <div className="text-center">
        <Button label="Read more" handleClick={() => navigate(`/books/${id}`)} type="neutral" />
      </div>
    </div>
  )
}

export default BookIntro
