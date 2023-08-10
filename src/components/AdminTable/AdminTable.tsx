import React from 'react'
import { AdminTableProps } from '../../features/types/types'
import { TableHeading } from '../TableItems/TableItems'

function AdminTable({ headers, rows }: AdminTableProps) {
  return (
    <table className="divide-y divide-gray-200 w-full">
      <thead className="bg-gray-50">
        <tr>
          {headers !== null && headers !== undefined
            ? headers.map((header) => <TableHeading key={header} label={header} />)
            : null}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">{rows}</tbody>
    </table>
  )
}

export default AdminTable
