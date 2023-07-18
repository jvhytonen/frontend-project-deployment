import React from 'react'
import { TableHeadingType } from '../../features/types/types'

function TableHeading({ label }: TableHeadingType) {
  return (
    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </th>
  )
}

export default TableHeading
