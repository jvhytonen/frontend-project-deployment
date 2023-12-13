import { Typography } from '@material-tailwind/react'
import React from 'react'
import { TableHeadingProps } from '../../../features/types/componentTypes'

function TableHeading({ label }: TableHeadingProps) {
  return (
    <td className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
        {label}
      </Typography>
    </td>
  )
}

export default TableHeading
