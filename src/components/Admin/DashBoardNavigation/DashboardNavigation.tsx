import React from 'react'
import { Card, Chip, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import {
  PowerIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  BookOpenIcon,
  PencilIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { useNavigate } from 'react-router-dom'
import { logUserOut } from '../../../features/slices/authSlice'
import { AdminTabsProps } from '../../../features/types/componentTypes'

export default function DashboardNavigation({ handleTabChange }: AdminTabsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(logUserOut())
    navigate('/logout')
  }
  return (
    <Card className="p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          ADMIN
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => handleTabChange('home')}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => handleTabChange('books')}>
          <ListItemPrefix>
            <BookOpenIcon className="h-5 w-5" />
          </ListItemPrefix>
          Books
        </ListItem>
        <ListItem onClick={() => handleTabChange('authors')}>
          <ListItemPrefix>
            <PencilIcon className="h-5 w-5" />
          </ListItemPrefix>
          Authors
        </ListItem>
        <ListItem onClick={() => handleTabChange('categories')}>
          <ListItemPrefix>
            <TagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Categories
        </ListItem>
        <ListItem onClick={() => handleTabChange('users')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem onClick={() => handleLogOut()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  )
}
