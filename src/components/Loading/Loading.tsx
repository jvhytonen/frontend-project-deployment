import { TableCell, TableRow } from '../TableItems/TableItems'
// This will be rendered if some of the tables does not contain data
function Loading() {
  return (
    <TableRow>
      <TableCell>Loading data....</TableCell>
    </TableRow>
  )
}

export default Loading
