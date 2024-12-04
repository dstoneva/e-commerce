import { createContext, useReducer, useEffect, useContext } from 'react'
import useSWR from 'swr'
import { useAuth } from '../AuthContext'

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'CATEGORIES_LOADED':
      return {
        ...state,
        categories: payload,
        isCategoriesLoading: false,
      }
    default:
      return state
  }
}

const initialState = {
  categories: [],
  isCategoriesLoading: true,
}

const CategoriesContext = createContext(initialState)

const CategoriesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { data, error } = useSWR(isAuthenticated ? `/categories` : null, {
    refreshInterval: 86400000, // 24 hours
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (!error && data) {
      dispatch({
        type: 'CATEGORIES_LOADED',
        payload: data.result,
      })
    }
  }, [data, error])

  return (
    <CategoriesContext.Provider
      value={{
        categories: state.categories,
        isCategoriesLoading: state.isCategoriesLoading,
      }}
      displayName="Categories"
    >
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategories = () => {
  const context = useContext(CategoriesContext)

  if (context === undefined) {
    throw new Error('useCategories can only be used inside CategoriesProvider')
  }

  return context
}

export { CategoriesProvider, useCategories }
