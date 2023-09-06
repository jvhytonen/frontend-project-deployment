import { TableHeading } from '../TableItems/TableItems'
import { AdminTableProps } from '../../features/types/componentTypes'

function AdminTable({ headers, rows }: AdminTableProps) {
  return (
    <table className="divide-y divide-gray-200 w-full">
      <thead className="bg-gray-100">
        <tr>
          {headers !== null && headers !== undefined
            ? headers.map((header) => <TableHeading key={header} label={header} />)
            : null}
        </tr>
      </thead>
      <tbody className="bg-cyan-50 divide-y divide-gray-200">{rows}</tbody>
    </table>
  )
}

export default AdminTable
