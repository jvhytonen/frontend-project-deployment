import React from 'react'
import { TableHeadingProps, TableProps } from '../../../features/types/componentTypes'

export function TableHeading({ label }: TableHeadingProps) {
  return (
    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
      {label}
    </th>
  )
}

export function TableRow({ children }: TableProps) {
  return <tr className="hover:bg-gray-100">{children}</tr>
}

export function TableCell({ children }: TableProps) {
  return <td className="py-4 px-6 border-b border-grey-light">{children}</td>
}
