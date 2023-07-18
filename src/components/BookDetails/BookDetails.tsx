import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { RootState, AppDispatch } from '../../store'
import Button, { HandleClick } from '../Button/Button'
import { getCopies } from '../../features/copy/copySlice'
import Copy from '../Copy/Copy'

function BookDetails() {
  const user = useSelector((state: RootState) => state.user)
  const book = useSelector((state: RootState) => state.book)
  const copies = useSelector((state: RootState) => state.copy)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const filteredBook = book.items?.filter((item) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null

  useEffect(() => {
    if (params.id) {
      dispatch(getCopies(params.id))
    }
  }, [])

  return (
    <div className="flex justify-center h-[50%] mt-[100px]">
      {bookItem ? (
        <div className="block w-[30%] my-8 rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          <img
            className="rounded-t-lg"
            src="https://tubular-unicorn-f30c80.netlify.app/seven_brothers.jpg"
            alt=""
          />
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {bookItem.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {bookItem.description}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Published: {bookItem.yearPublished}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Publisher: {bookItem.publisher}
            </p>
          </div>
          <h3>Copies: </h3>
          <p>Amount of copies: {copies ? copies.items?.length : '0'}</p>
          {copies
            ? copies.items?.map((copy, index) => {
                return (
                  <Copy
                    key={index}
                    copyOrderNumber={index + 1}
                    latestCheckout={copy.latestCheckout ? copy.latestCheckout : null}
                    copyId={copy.copyId}
                  />
                )
              })
            : null}
        </div>
      ) : null}
    </div>
  )
}

export default BookDetails
