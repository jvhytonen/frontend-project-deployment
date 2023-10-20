import React, { useEffect } from 'react'

import { Button, IconButton } from '@material-tailwind/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { getBooksBySearchQuery } from '../../features/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setPage } from '../../features/slices/searchquerySlice'

function Pagination() {
  const dispatch = useDispatch<AppDispatch>()
  const page = useSelector((state: RootState) => state.search.page)
  const text = useSelector((state: RootState) => state.search.query)

  const getNextItems = () => {
    const request = {
      page: page,
      query: text
    }
    dispatch(getBooksBySearchQuery(request))
  }

  useEffect(() => {
    getNextItems()
  }, [page])

  const getItemProps = (index: number) =>
    ({
      variant: page === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => setPage(index),
      className: 'rounded-full'
    } as any)

  const next = () => {
    if (page === 5) return

    dispatch(setPage(page + 1))
  }

  const prev = () => {
    if (page === 1) return

    dispatch(setPage(page - 1))
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={page === 1}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={page === 5}>
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  )
}
export default Pagination
