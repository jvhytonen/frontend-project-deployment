import { Card, CardHeader, CardBody, Typography, Chip, Button } from '@material-tailwind/react'
import { posts } from '../../features/utils/mockData'

// This section works still with mock-data. No fetching from the database (yet)
interface NewsProps {
  img: string
  title: string
  desc: string
}

function BlogPostCard({ img, title, desc }: NewsProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader floated={false} className="mx-0 mb-6 h-52">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody className="p-0">
        <Typography as="a" href="#" variant="h4" color="blue-gray" className="mb-2 normal-case">
          {title}
        </Typography>
        <Typography className="mb-6 font-normal !text-gray-500">{desc}</Typography>
        <Button color="gray">read more</Button>
      </CardBody>
    </Card>
  )
}

export function NewsSection() {
  return (
    <section className="py-8 px-8 lg:py-40">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-2 !text-3xl lg:!text-5xl">
          Check out what&apos;s new
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12">
          Recent news from us
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {posts.map(({ img, title, desc }) => (
          <BlogPostCard key={title} img={img} title={title} desc={desc} />
        ))}
      </div>
    </section>
  )
}

export default NewsSection
