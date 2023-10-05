import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { S3IMAGEURL } from '../../features/utils/variables'
import { RootState, AppDispatch } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import { getAllBooks } from '../../features/slices/bookSlice'
import { Book } from '../../features/types/reduxTypes'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react'

function Books() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, error } = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(getAllBooks())
  }, [])

  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-2 ">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items !== null
            ? items.map((item: Book) => {
                return (
                  <Card key={item.id} className="w-auto max-w-[24rem]">
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img
                        src={item.imageUrl ? S3IMAGEURL + item.imageUrl : 'defaultCover.jpg'}
                        alt="img-blur-shadow"
                        className="h-full w-full object-contain"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium uppercase">
                        {item.category.name}
                      </Typography>
                      <Typography variant="h4" color="blue-gray" className="mt-1 mb-2">
                        {item.title}
                      </Typography>
                      <Typography color="gray" className="font-normal">
                        {item.description.slice(0, 100)}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex items-center pt-1">
                      <div className="ml-4">
                        <Typography color="blue-gray" className="font-medium">
                          {item.author.name}
                        </Typography>
                        <Typography variant="small" color="gray">
                          {item.yearPublished.slice(0, 4)}
                        </Typography>
                      </div>
                    </CardFooter>
                  </Card>
                )
              })
            : null}
          {error ? <p className="text-red-600">{error}</p> : null}
        </div>
      </div>
    </section>
  )
}

export default Books

/* 
{items !== null
  ? items.map((item: Book) => {
      return (
        <BookIntro
          key={item.id}
          isbn={item.isbn}
          id={item.id}
          title={item.title}
          author={item.author}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      )
    })
  : null}
{error ? <p className="text-red-600">{error}</p> : null} */
// src={item.imageUrl ? S3IMAGEURL + item.imageUrl : 'defaultCover.jpg'}
