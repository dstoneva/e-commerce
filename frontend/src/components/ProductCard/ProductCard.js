import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart, useFavourites } from 'core'
import { DefaultProductView, DrawerCartView, CartView } from './components'

const ProductCard = ({ product, inCart = false, inCartDrawer = false, quickView = false }) => {
  const { addToCart, removeFromCart, getFinalPrice, removeWholeProductFromCart, getQuantity, itemIds } = useCart()
  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites()
  const navigate = useNavigate()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const finalPrice = getFinalPrice(product)

  const handleQuickView = () => setDialogOpen(!isDialogOpen)
  const handleAdd = () => addToCart(product)
  const handleRemove = () => removeFromCart(product._id)

  if (inCartDrawer) {
    return (
      <DrawerCartView
        product={product}
        finalPrice={finalPrice}
        getQuantity={getQuantity}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        itemIds={itemIds}
      />
    )
  }

  if (inCart) {
    return (
      <CartView
        product={product}
        finalPrice={finalPrice}
        getQuantity={getQuantity}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        removeWholeProductFromCart={removeWholeProductFromCart}
        itemIds={itemIds}
      />
    )
  }

  return (
    <DefaultProductView
      product={product}
      finalPrice={finalPrice}
      quickView={quickView}
      isDialogOpen={isDialogOpen}
      handleQuickView={handleQuickView}
      addToFavourites={addToFavourites}
      removeFromFavourites={removeFromFavourites}
      isFavourite={isFavourite}
      navigate={navigate}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
      getQuantity={getQuantity}
      itemIds={itemIds}
    />
  )
}

export default ProductCard
