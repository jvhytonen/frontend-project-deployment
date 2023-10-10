import React from 'react'
import { TableHeadingProps, TableProps } from '../../../features/types/componentTypes'

export function TableHeading({ label }: TableHeadingProps) {
  return <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">{label}</th>
}

export function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>
}

export function TableCell({ children, classes }: TableProps) {
  return <td className={classes}>{children}</td>
}
