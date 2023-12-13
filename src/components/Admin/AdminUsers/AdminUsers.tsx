import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { User } from '../../../features/types/reduxTypes'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import TableHeading from '../TableHeading/TableHeading'
import { TableBody } from '../TableBody/TableBody'
import { Card } from '@material-tailwind/react'
import { getAllUsers } from '../../../features/slices/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'

function AdminUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null)
  const allUsers = useSelector((state: RootState) => state.user.items)

  const filter = (word: string) => {
    if (allUsers !== null) {
      const matches = allUsers.filter((user) => user.name.includes(word))
      setFilteredUsers(matches)
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(getAllUsers(token))
      setFilteredUsers(allUsers)
    }
  }, [])
  const headings = ['id', 'Name', 'Username', 'Edit', 'Delete']

  return (
    <Card className="h-full w-full">
      <AdminSearchAndAdd
        label="These are all the users in the database."
        navigation="../users/add"
        section="user"
        filter={filter}
      />
      <table className="w-full h-[50%] table-auto text-left">
        <thead>
          {headings.map((heading) => {
            return <TableHeading key={heading} label={heading} />
          })}
        </thead>
        <TableBody items={filteredUsers} feature={'authors'} />
      </table>
    </Card>
  )
}

export default AdminUsers
