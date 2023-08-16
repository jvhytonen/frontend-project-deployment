import { TableCell, TableRow } from '../TableItems/TableItems'
// This will be rendered if some of the tables does not contain data
function NoData() {
  return (
    <TableRow>
      <TableCell>No data.</TableCell>
    </TableRow>
  )
}

export default NoData
