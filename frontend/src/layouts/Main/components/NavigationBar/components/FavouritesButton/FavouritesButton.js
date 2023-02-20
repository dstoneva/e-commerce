import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Avatar, Badge, IconButton } from '@mui/material'
import { useFavourites } from 'core'
import { useNavigate } from 'react-router-dom'
import { PageURLs } from 'Routes'

const FavouritesButton = () => {
  const { favouritesQuantity } = useFavourites()
  const navigate = useNavigate()

  return (
    <IconButton sx={{ p: 0, ml: 1 }} onClick={() => navigate(PageURLs.Favourites)}>
      <Badge badgeContent={favouritesQuantity} color="primary">
        <Avatar>
          <FavoriteBorderOutlinedIcon />
        </Avatar>
      </Badge>
    </IconButton>
  )
}

export default FavouritesButton
