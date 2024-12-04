import { createContext, useReducer, useEffect, useContext } from 'react'
import { queryParamAsArray } from 'utils'
import { useSnackbar } from 'notistack'
import useSWR from 'swr'
import { useAuth } from '../AuthContext'

const favouritesReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'FAVOURITES_LOADED':
      const initialFavourites = state.favourites
        .filter((item) => payload.map((productData) => productData._id).includes(item._id))
        .filter((item) => payload.find((productData) => productData._id === item._id)?.stock !== 0)
        .map((item) => {
          const product = payload.find((productData) => productData._id === item._id)

          return {
            ...item,
            title: product.title,
            price: product.price,
            stock: product.stock,
            quantity: item.quantity >= product.stock ? product.stock : item.quantity,
            thumbnail: product.thumbnail,
            discountPercentage: product.discountPercentage,
          }
        })
      localStorage.setItem('favourites', JSON.stringify(initialFavourites))
      return {
        ...state,
        favourites: initialFavourites,
        isFavouritesLoading: false,
      }
    case 'EMPTY_FAVOURITES':
    case 'FAVOURITES_LOADED_ERROR':
      return {
        ...state,
        isFavouritesLoading: false,
      }
    case 'FAVOURITES_LOADING':
      return {
        ...state,
        isFavouritesLoading: payload,
      }
    case 'ADD_TO_FAVOURITES':
      const product = payload
      const isNewItem = state.favourites.map((item) => item._id).indexOf(product._id) === -1
      const itemProps = {
        title: product.title,
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
      }
      const favouritesWithNewItem = !isNewItem
        ? [...state.favourites]
        : [...state.favourites, { _id: product._id, ...itemProps }]
      localStorage.setItem('favourites', JSON.stringify(favouritesWithNewItem))
      return {
        ...state,
        favourites: favouritesWithNewItem,
        isFavouritesLoading: false,
      }

    case 'REMOVE_FROM_FAVOURITES':
      const filteredFavourites = state.favourites.filter((product) => product._id !== payload)

      filteredFavourites.length
        ? localStorage.setItem('favourites', JSON.stringify(filteredFavourites))
        : localStorage.removeItem('favourites')
      return {
        ...state,
        favourites: filteredFavourites,
        isFavouritesLoading: false,
      }
    case 'RESET_FAVOURITES':
      localStorage.removeItem('favourites')
      return {
        ...state,
        favourites: [],
        isFavouritesLoading: false,
      }
    default:
      return state
  }
}

const favourites = JSON.parse(localStorage.favourites ?? '[]')
const favouriteItemIds = JSON.parse(localStorage.favourites ?? '[]').map((item) => item?._id)

const initialState = {
  favourites,
  favouritesQuantity: 0,
  isFavouritesLoading: true,
}

const FavouritesContext = createContext(initialState)

const FavouritesProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isAuthenticated } = useAuth()
  const [state, dispatch] = useReducer(favouritesReducer, initialState)
  const { data, error } = useSWR(
    favourites.length && isAuthenticated
      ? `/products/by-ids?${queryParamAsArray('productIds', favouriteItemIds)}`
      : null,
    {
      refreshInterval: 86400000, // 24 hours
      revalidateOnFocus: false,
        }
  )

  useEffect(() => {
    if (!error && data) {
      dispatch({
        type: 'FAVOURITES_LOADED',
        payload: data.result,
      })
    } else {
      dispatch({
        type: 'FAVOURITES_LOADED_ERROR',
      })
    }
  }, [data, error])

  const addToFavourites = (product, showNotification = true) => {
    setFavouritesLoadingState(true)
    dispatch({
      type: 'ADD_TO_FAVOURITES',
      payload: product,
    })
    showNotification && enqueueSnackbar(`You added ${product.title} to your favourites`, { variant: 'success' })
  }

  const removeFromFavourites = (productId, showNotification = true) => {
    dispatch({
      type: 'REMOVE_FROM_FAVOURITES',
      payload: productId,
    })
    showNotification &&
      enqueueSnackbar(`You successfully removed one item from your favourites`, { variant: 'success' })
  }

  const resetFavourites = () => {
    dispatch({
      type: 'RESET_FAVOURITES',
    })
  }

  const setFavouritesLoadingState = (boolean) => {
    dispatch({
      type: 'FAVOURITES_LOADING',
      payload: boolean,
    })
  }

  const isFavourite = (productId) => {
    return state.favourites.map((item) => item._id).includes(productId) ? true : false
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.favourites,
        favouriteItemIds: state.favourites.map((item) => item._id),
        favouritesQuantity: state.favourites.length,
        isFavouritesLoading: state.isFavouritesLoading,
        addToFavourites,
        resetFavourites,
        isFavourite,
        removeFromFavourites,
        setFavouritesLoadingState,
      }}
      displayName="Favourites"
    >
      {children}
    </FavouritesContext.Provider>
  )
}

const useFavourites = () => {
  const context = useContext(FavouritesContext)

  if (context === undefined) {
    throw new Error('useFavourites can only be used inside FavouritesProvider')
  }

  return context
}

export { FavouritesProvider, useFavourites }
