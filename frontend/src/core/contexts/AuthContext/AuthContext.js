import { createContext, useReducer, useEffect, useContext } from 'react'
import axios from 'axios'
import { setAuthToken } from 'utils'
import { useSnackbar } from 'notistack'
import { useError } from 'utils/hooks'
import { API_URL } from 'config'
import { useNavigate } from 'react-router-dom'

const authReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        loadingAuth: false,
        isAuthenticated: true,
        user: payload.user,
      }
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loadingAuth: false,
        loggingIn: true,
        user: payload.user,
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        user: payload,
      }
    case 'SET_LOGGING_IN':
      return {
        ...state,
        loggingIn: payload,
      }
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
    case 'AUTH_ERROR':
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loadingAuth: false,
        user: null,
      }
    default:
      return state
  }
}

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loadingAuth: true,
  user: null,
  loggingIn: false,
}

const AuthContext = createContext(initialState)

const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, dispatch] = useReducer(authReducer, initialState)
  const navigate = useNavigate()
  const { setError } = useError()

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)

      try {
        const { data } = await axios.get(`${API_URL}/user/me`)

        dispatch({
          type: 'USER_LOADED',
          payload: data,
        })
      } catch (error) {
        setError(error)
        dispatch({ type: 'AUTH_ERROR' })
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' })
    }
  }

  const updateUser = (data) => {
    dispatch({
      type: 'USER_LOADED',
      payload: data,
    })
  }

  const login = async ({ email, password, greet = true }) => {
    const body = { email: email.toLowerCase(), password }

    try {
      delete axios.defaults.headers.common['Authorization']
      const { data } = await axios.post(`${API_URL}/user/login`, body)

      greet && enqueueSnackbar(data.message, { variant: 'success' })
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data,
      })

      setAuthToken(data.token)
    } catch (error) {
      setError(error)

      dispatch({
        type: 'LOGIN_FAIL',
      })
    }
  }

  const logout = ({ sessionExpired = false }) => {
    dispatch({ type: 'LOGOUT' })
    sessionExpired
      ? enqueueSnackbar('Session expired, please login again', { variant: 'warning' })
      : enqueueSnackbar('See you soon!', { variant: 'success' })
    navigate('/login')
  }

  const register = async (values) => {
    const { password, name, phone, email } = values
    try {
      const { data } = await axios.post(`${API_URL}/user/register`, {
        password,
        name,
        phone,
        email,
      })
      enqueueSnackbar('Registration was successful!', { variant: 'success' })
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      })

      setAuthToken(data.token)
    } catch (error) {
      setError(error)
    }
  }

  const editProfile = async (values) => {
    try {
      const { data } = await axios.put(`${API_URL}/user`, {
        ...values,
      })

      dispatch({
        type: 'EDIT_PROFILE',
        payload: data,
      })
      enqueueSnackbar('Profile was updated successfully', { variant: 'success' })
    } catch (error) {
      setError(error)
    }
  }

  const setLoggingIn = (boolean) => {
    dispatch({
      type: 'SET_LOGGING_IN',
      payload: boolean,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loggingIn: state.loggingIn,
        loadingAuth: state.loadingAuth,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.user?.userGroup === 0,
        login,
        logout,
        register,
        updateUser,
        editProfile,
        setLoggingIn,
      }}
      displayName="Authentication"
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth can only be used inside AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
