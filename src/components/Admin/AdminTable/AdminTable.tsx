import { TableHeading } from '../TableItems/TableItems'
import { AdminTableProps } from '../../../features/types/componentTypes'
// Table from https://tailwindcomponents.com/component/table
function AdminTable({ headers, rows }: AdminTableProps) {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {headers !== null && headers !== undefined
            ? headers.map((header) => <TableHeading key={header} label={header} />)
            : null}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default AdminTable
