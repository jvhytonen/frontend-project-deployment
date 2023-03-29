import React from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'
import { logUserOut } from '../../features/user/userSlice'

function Logout() {
  const dispatch = useDispatch<AppDispatch>()
  return <div>You have been logged out.</div>
}

export default Logout
