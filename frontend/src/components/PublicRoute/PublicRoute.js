import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'core'
import React from 'react'

/* @desc
 * Will redirect user to / if is logged in already
 */

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  let location = useLocation()

  if (isAuthenticated) {
    return <Navigate to={'/'} state={{ from: location }} replace />
  } else {
    return children
  }
}

export default PublicRoute
