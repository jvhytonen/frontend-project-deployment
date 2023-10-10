import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { logUserOut } from '../../features/slices/authSlice'

function Logout() {
  const dispatch = useDispatch<AppDispatch>()
  dispatch(logUserOut())
  return <div>You have been logged out.</div>
}

export default Logout
