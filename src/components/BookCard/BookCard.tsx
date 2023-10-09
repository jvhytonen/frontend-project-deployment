import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  CardFooter
} from '@material-tailwind/react'
import { BookCardProps } from '../../features/types/componentTypes'
import { Link } from 'react-router-dom'

function BookCard({
  imageUrl,
  id,
  category,
  title,
  description,
  author,
  yearPublished
}: BookCardProps) {
  const searchByAuthor = () => {
    console.log('Search')
  }
  return (
    <Card shadow={false} className="border border-gray-300">
      <CardBody className="h-full md:w-[280px]">
        <div className="h-[180px] w-full ">
          <img src={imageUrl} alt="photo" className="h-full w-full object-contain" />
        </div>
        <div className="mt-4">
          <Typography className="mb-2 text-center !text-base !font-semibold !text-gray-700">
            {category}
          </Typography>
          <Typography className="mb-2 text-center" color="blue-gray" variant="h5">
            {title}
          </Typography>
          <div className="mb-5 flex items-center justify-center gap-2">
            <Typography className="mb-2 text-center !text-base !font-semibold !text-gray-700">
              {author}
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button>
              <Link to={`/books/${id}`}>Read more </Link>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default BookCard
