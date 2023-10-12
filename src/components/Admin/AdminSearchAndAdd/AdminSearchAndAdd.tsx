import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { Button, CardHeader, Input, Typography } from '@material-tailwind/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AdminSearchAndAddProps } from '../../../features/types/componentTypes'
import { useNavigate } from 'react-router-dom'

function AdminSearchAndAdd({ section, navigation, label, filter }: AdminSearchAndAddProps) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    filter(searchValue)
  }, [searchValue])

  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            {section.toUpperCase()}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {label}
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
          <Button
            className="flex items-center gap-3"
            size="sm"
            onClick={() => navigate(navigation)}>
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add new {section}
          </Button>
        </div>
      </div>
    </CardHeader>
  )
}

export default AdminSearchAndAdd
