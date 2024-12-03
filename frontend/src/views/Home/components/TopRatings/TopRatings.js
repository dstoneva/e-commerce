import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Box, Typography, CardActionArea, CardMedia, Rating } from '@mui/material'
import { DisplayCurrency } from 'components'
import { topRatingsDetails } from 'views/Home/data/data'
import Section from '../Section/Section'

const TopRatings = () => {
  return (
    <Section
      title="Top Ratings"
      icon={<WorkspacePremiumIcon color="warning" />}
      data={topRatingsDetails}
      buttonLink="#"
      gridSpacing={4}
      columnSpacing={4}
      itemBreakpoints={{ xs: 12, md: 3, sm: 6 }}
      itemStyle={{
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      renderItem={(item) => (
        <>
          <CardActionArea sx={{ mb: 1.5 }}>
            <CardMedia
              component="img"
              image={item.imgURL}
              alt={item.title}
              sx={{ borderRadius: '8px', aspectRatio: 1 / 1 }}
            />
          </CardActionArea>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={4} sx={{ fontSize: '1.25rem' }} />
            <Typography fontSize={12} fontWeight={600}>
              (49)
            </Typography>
          </Box>
          <Typography variant="h6" align="center" sx={{ fontSize: '14px !important', fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography color="primary" variant="h6" align="center" sx={{ fontSize: '14px !important', fontWeight: 600 }}>
            <DisplayCurrency number={item.price} />
          </Typography>
        </>
      )}
    />
  )
}

export default TopRatings
