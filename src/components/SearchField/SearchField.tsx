import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, CardHeader, Input, Typography } from '@material-tailwind/react'
import React, { ChangeEvent } from 'react'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksBySearchQuery } from '../../features/slices/bookSlice'
import { setPage, setText } from '../../features/slices/searchquerySlice'

function SearchItems() {
  const dispatch = useDispatch<AppDispatch>()
  const page = useSelector((state: RootState) => state.search.page)
  const searchQuery = useSelector((state: RootState) => state.search.query)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setText(event.target.value))
  }
  const handleSubmit = () => {
    dispatch(setPage(1))
    const request = {
      query: searchQuery,
      page: page
    }
    dispatch(getBooksBySearchQuery(request))
  }

  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            Search
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-full md:w-72">
            <Input
              onChange={(value) => {
                handleInputChange(value)
              }}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          <Button className="flex items-center gap-3" size="sm" onClick={() => handleSubmit()}>
            <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Search
          </Button>
        </div>
      </div>
    </CardHeader>
  )
}

export default SearchItems
