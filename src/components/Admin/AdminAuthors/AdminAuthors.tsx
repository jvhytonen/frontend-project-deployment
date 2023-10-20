import { useEffect, useState } from 'react'

import { Author } from '../../../features/types/reduxTypes'
import { Card } from '@material-tailwind/react'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import { TableBody } from '../TableBody/TableBody'
import TableHeading from '../TableHeading/TableHeading'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

function AdminAuthors() {
  const [filteredAuthors, setFilteredAuthors] = useState<Author[] | null>(null)
  const allAuthors = useSelector((state: RootState) => state.author.items)

  const filter = (word: string) => {
    if (allAuthors !== null) {
      const matches = allAuthors.filter((author) => author.name.includes(word))
      setFilteredAuthors(matches)
    }
  }

  useEffect(() => {
    setFilteredAuthors(allAuthors)
  }, [])
  const headings = ['Author', 'Edit', 'Delete']
  return (
    <Card className="h-full w-full">
      <AdminSearchAndAdd
        label="These are all the authors in the database."
        navigation="../authors/add"
        section="author"
        filter={filter}
      />
      <table className="w-full h-[50%] table-auto text-left">
        <thead>
          {headings.map((heading) => {
            return <TableHeading key={heading} label={heading} />
          })}
        </thead>
        <TableBody items={filteredAuthors} feature={'authors'} />
      </table>
    </Card>
  )
}

export default AdminAuthors
