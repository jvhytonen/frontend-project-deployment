import { Card, CardHeader, CardBody, Typography, Avatar, Button } from '@material-tailwind/react'
import { BookCardProps } from '../../features/types/componentTypes'

function BookCard({
  imageUrl,
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
    <Card color="transparent" className="item grid gap-2 sm:grid-cols-2" shadow={false}>
      <CardHeader floated={false} className="m-0">
        <img src={imageUrl} alt={title} className="h-full object-cover" />
      </CardHeader>
      <CardBody className="px-2 sm:pr-6 sm:pl-4 flex flex-col">
        <div>
          <div className="mb-4 !font-semibold">
            <Typography variant="small" color="blue-gray">
              {category}
            </Typography>
          </div>
          <div className="mb-2 normal-case transition-colors hover:text-gray-700">
            <Typography as="a" href="#" variant="h5" color="blue-gray">
              {title}
            </Typography>
          </div>
          <div className="mb-8 font-normal !text-gray-500">
            <Typography>{description}</Typography>
          </div>
          <div className="flex items-center gap-4">
            {/* <Avatar variant="circular" src={author.img} alt={author.name} /> */}
            <div>
              <Typography
                color="blue-gray"
                className="mb-0.5 !font-semibold"
                onClick={() => searchByAuthor()}>
                {author}
              </Typography>
              <Typography color="gray" className="font-normal">
                {yearPublished.slice(0, 4)}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="self-start">
          <Button>Read more</Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default BookCard
