import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'core'
import { PageURLs } from 'Routes'
import React from 'react'

/* @desc
 * Will redirect user to login page if is not logged in
 */

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  let location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={PageURLs.Login} state={{ from: location }} replace />
  } else {
    return children
  }
}

export default PrivateRoute
