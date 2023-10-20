import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <header className="bg-white p-8">
      <div className="container mx-auto grid h-full min-h-[85vh] w-full grid-cols-1 place-items-center gap-y-10 lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto lg:-mt-40">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-2 max-w-sm text-3xl !leading-snug lg:mb-3 lg:text-5xl">
            Find your e-book.
          </Typography>
          <Typography
            variant="paragraph"
            className="mb-6 font-normal !text-gray-500 md:pr-16 lg:mb-14 xl:pr-52">
            Stop mindless surfing and start reading something deeper now.
          </Typography>
          <div className="flex gap-3">
            <Button
              color="gray"
              className="w-full px-4 md:w-[10rem]"
              onClick={() => navigate('/books')}>
              browse books
            </Button>
            <Button
              color="gray"
              variant="outlined"
              className="w-full px-4 md:w-[10rem]"
              onClick={() => navigate('/about')}>
              read more about this project
            </Button>
          </div>
        </div>
        <div className="mt-40 grid gap-6 lg:mt-0">
          <div className="grid grid-cols-4 gap-6">
            <img src="selkosenkansaa-cover.jpg" className="rounded-lg shadow-md" alt="flowers" />
            <img src="harhama-covers.jpg" className="-mt-28 rounded-lg shadow-md" alt="flowers" />
            <img src="gunslinger-cover.jpg" className="-mt-14 rounded-lg shadow-md" alt="flowers" />
            <img
              src="koirapuisto-cover.jpg"
              className="-mt-20 rounded-lg shadow-md"
              alt="flowers"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div></div>
            <img src="hytti6-cover.jpg" className="-mt-28 rounded-lg shadow-md" alt="flowers" />
            <img
              src="pohjantahti-cover.jpg"
              className="-mt-14 rounded-lg shadow-md"
              alt="flowers"
            />
            <img src="tuntematon-cover.jpg" className="-mt-20 rounded-lg shadow-md" alt="flowers" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Home
