import { createContext, useReducer, useEffect, useContext } from 'react'
import { queryParamAsArray } from 'utils'
import { useSnackbar } from 'notistack'
import useSWR from 'swr'
import { useAuth } from '../AuthContext'

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'CART_LOADED':
      const initialCart = state.cart
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
            rating: product.rating,
            thumbnail: product.thumbnail,
            discountPercentage: product.discountPercentage,
          }
        })
      localStorage.setItem('cart', JSON.stringify(initialCart))
      return {
        ...state,
        cart: initialCart,
        isCartLoading: false,
      }
    case 'EMPTY_CART':
    case 'CART_LOADED_ERROR':
      return {
        ...state,
        isCartLoading: false,
      }
    case 'CART_LOADING':
      return {
        ...state,
        isCartLoading: payload,
      }
    case 'ADD_TO_CART':
      const product = payload
      const isNewItem = state.cart.map((item) => item._id).indexOf(product._id) === -1
      const itemProps = {
        title: product.title,
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
        discountPercentage: product.discountPercentage,
      }
      const cartWithNewItem = !isNewItem
        ? state.cart.map((item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  ...itemProps,
                }
              : item
          )
        : [...state.cart, { _id: product._id, quantity: 1, ...itemProps }]
      localStorage.setItem('cart', JSON.stringify(cartWithNewItem))
      return {
        ...state,
        cart: cartWithNewItem,
        isCartLoading: false,
      }
    case 'REMOVE_FROM_CART':
      const selectedRawProductIndex = state.cart.findIndex((item) => item._id === payload)
      const currentProduct = selectedRawProductIndex !== -1 ? state.cart[selectedRawProductIndex] : null
      let cartWithoutOneItem

      if (currentProduct) {
        if (currentProduct?.quantity <= 1) {
          cartWithoutOneItem = state.cart.filter((item) => item._id !== currentProduct._id)
        } else {
          cartWithoutOneItem = state.cart.map((item) =>
            item._id === currentProduct._id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
        }
      }

      cartWithoutOneItem.length
        ? localStorage.setItem('cart', JSON.stringify(cartWithoutOneItem))
        : localStorage.removeItem('cart')
      return {
        ...state,
        cart: cartWithoutOneItem,
        isCartLoading: false,
      }
    case 'REMOVE_WHOLE_PRODUCT_FROM_CART':
      const filteredCart = state.cart.filter((product) => product._id !== payload)

      filteredCart.length ? localStorage.setItem('cart', JSON.stringify(filteredCart)) : localStorage.removeItem('cart')
      return {
        ...state,
        cart: filteredCart,
        isCartLoading: false,
      }
    case 'RESET_CART':
      localStorage.removeItem('cart')
      return {
        ...state,
        cart: [],
        isCartLoading: false,
      }
    default:
      return state
  }
}

const cart = JSON.parse(localStorage.cart ?? '[]')
const itemIds = JSON.parse(localStorage.cart ?? '[]').map((item) => item?._id)

const initialState = {
  cart,
  quantity: 0,
  totalPrice: 0,
  isCartLoading: true,
}

const CartContext = createContext(initialState)

const CartProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { isAuthenticated } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { data, error } = useSWR(
    cart.length && isAuthenticated ? `/products/by-ids?${queryParamAsArray('productIds', itemIds)}` : null,
    {
      refreshInterval: 86400000, // 24 hours
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  )

  useEffect(() => {
    if (!error && data) {
      dispatch({
        type: 'CART_LOADED',
        payload: data.result,
      })
    } else {
      dispatch({
        type: 'CART_LOADED_ERROR',
      })
    }
  }, [data, error])

  const addToCart = (product, showNotification = true) => {
    setCartLoadingState(true)
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    })
    showNotification && enqueueSnackbar(`You added ${product.title} to your cart`, { variant: 'success' })
  }

  const removeFromCart = (productId, showNotification = true) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId,
    })
    showNotification && enqueueSnackbar(`You successfully removed one item from your cart`, { variant: 'success' })
  }

  const removeWholeProductFromCart = (productId, showNotification = true) => {
    dispatch({
      type: 'REMOVE_WHOLE_PRODUCT_FROM_CART',
      payload: productId,
    })
    showNotification && enqueueSnackbar(`You successfully removed one item from your cart`, { variant: 'success' })
  }

  const resetCart = () => {
    dispatch({
      type: 'RESET_CART',
    })
  }

  const setCartLoadingState = (boolean) => {
    dispatch({
      type: 'CART_LOADING',
      payload: boolean,
    })
  }

  const getFinalPrice = (product) => {
    return product.discountPercentage > 0
      ? product.price - (product.price / 100) * product.discountPercentage
      : product.price
  }

  const getQuantity = (productId) => {
    return state.cart.map((item) => item._id).includes(productId)
      ? state.cart.find((product) => product._id === productId)?.quantity
      : 0
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        itemIds: state.cart.map((item) => item._id),
        quantity: state.cart
          .map((item) => item.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        totalPrice: state.cart
          .map((product) => +(getFinalPrice(product) * product.quantity).toFixed(2))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        isCartLoading: state.isCartLoading,
        addToCart,
        resetCart,
        getQuantity,
        getFinalPrice,
        removeFromCart,
        setCartLoadingState,
        removeWholeProductFromCart,
      }}
      displayName="Shopping Cart"
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart can only be used inside CartProvider')
  }

  return context
}

export { CartProvider, useCart }
