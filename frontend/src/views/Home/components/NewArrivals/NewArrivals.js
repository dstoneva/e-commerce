import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { Typography, CardActionArea, CardMedia } from '@mui/material'
import { DisplayCurrency } from 'components'
import { newArrivalsDetails } from 'views/Home/data/data'
import Section from '../Section/Section'

const NewArrivals = () => {
  return (
    <Section
      title="New Arrivals"
      icon={<NewReleasesIcon color="success" />}
      data={newArrivalsDetails}
      buttonLink="#"
      gridSpacing={3}
      itemBreakpoints={{ xs: 6, md: 3, sm: 4, lg: 2 }} // Matches original grid item breakpoints
      itemStyle={{
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Matches original alignment
      }}
      renderItem={(item) => (
        <>
          <CardActionArea sx={{ mb: 1.5 }}>
            <CardMedia
              loading="lazy"
              component="img"
              image={item.imgURL}
              alt={item.title}
              sx={{ borderRadius: '8px', aspectRatio: 1 / 1 }}
            />
          </CardActionArea>
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

export default NewArrivals
