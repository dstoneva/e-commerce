import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Tooltip,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from '@mui/material'
import DisplayCurrency from 'components/DisplayCurrency'
import { useCart } from 'core'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { DEFAULT_LOCALIZATION } from 'config'
import { FavoriteBorder, RemoveRedEye } from '@mui/icons-material'

const ProductCard = ({ product, center = false }) => {
  const { addToCart, itemIds, removeFromCart, getQuantity } = useCart()

  return (
    <Card
      sx={{
        margin: 1,
        position: 'relative',
        '&:hover #hidden-menu-fav-eye': {
          opacity: 1,
          transition: 'opacity 0.25s',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 10,
          right: 10,
          opacity: 0,
          transition: 'opacity 0.25s',
        }}
        id="hidden-menu-fav-eye"
      >
        <IconButton>
          <RemoveRedEye fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.26)' }} />
        </IconButton>
        <IconButton>
          <FavoriteBorder fontSize="small" sx={{ color: 'rgba(0, 0, 0, 0.26)' }} />
        </IconButton>
      </Box>
      {!!product.discountPercentage && (
        <Chip
          color="primary"
          size="small"
          sx={{ px: 0.5, position: 'absolute', top: 10, left: 10, fontWeight: 600 }}
          label={`${new Intl.NumberFormat(DEFAULT_LOCALIZATION, { style: 'percent' }).format(
            product.discountPercentage / 100
          )} off`}
        />
      )}
      <CardMedia component="img" height={300} image={product.thumbnail} alt={product.title} />
      <Box display="flex" p={2}>
        <CardContent sx={{ width: '100%', p: 0 }}>
          <Tooltip title={product.title} placement="bottom-start">
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              noWrap
              sx={{ fontSize: '14px !important', fontWeight: 600, mb: 1 }}
            >
              {product.title}
            </Typography>
          </Tooltip>
          <Rating name="read-only" value={product.rating} readOnly size="medium" sx={{ fontSize: '1.25rem' }} />
          <Typography variant="body2" component="div" color="primary" sx={{ fontWeight: 600, mt: 1 }}>
            {product.discountPercentage > 0 ? (
              <>
                <Box display="flex" alignItems="center">
                  <Box>
                    <DisplayCurrency number={product.price - (product.price / 100) * product.discountPercentage} />
                  </Box>
                  <Box sx={{ textDecoration: 'line-through', ml: 1, color: (theme) => theme.palette.grey[600] }}>
                    <DisplayCurrency number={product.price} />
                  </Box>
                </Box>
              </>
            ) : (
              <DisplayCurrency number={product.price} />
            )}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ width: 30, p: 0, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}
        >
          {itemIds.includes(product._id) && (
            <>
              <Button
                color="primary"
                onClick={() => removeFromCart(product._id)}
                variant="outlined"
                sx={{ minWidth: 0, p: '3px' }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Typography fontWeight={600}>{getQuantity(product._id)}</Typography>
            </>
          )}
          <Button
            color="primary"
            onClick={() => addToCart(product)}
            variant="outlined"
            sx={{ minWidth: 0, p: '3px', m: '0 !important' }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProductCard
