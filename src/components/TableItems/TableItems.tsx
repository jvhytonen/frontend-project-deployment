import React from 'react'
import { TableHeadingType, TableProps } from '../../features/types/componentTypes'

export function TableHeading({ label }: TableHeadingType) {
  return (
    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </th>
  )
}

export function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>
}

export function TableCell({ children }: TableProps) {
  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>
}
