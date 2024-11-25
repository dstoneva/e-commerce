import { Skeleton, Grid, Box, Typography, Button } from '@mui/material'

const BannerSlide = ({
  title,
  description,
  buttonText,
  imageUrl,
  altText,
  onButtonClick,
  titleProps = {},
  descriptionProps = {},
  buttonProps = {},
  imageProps = {},
  containerProps = {},
}) => (
  <Grid
    container
    spacing={3}
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{
      paddingY: 4,
      paddingX: 3,
      maxHeight: { xs: 'auto', md: 450 },
      minHeight: 400,
      ...containerProps.sx,
    }}
    {...containerProps}
  >
    <Grid item xs={12} sm={5}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            lineHeight: 1.2,
          }}
          {...titleProps}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'secondary.dark',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 1.5,
            maxWidth: '90%',
          }}
          {...descriptionProps}
        >
          {description}
        </Typography>
        {buttonText && (
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: 64, width: 154, height: 44 }}
            onClick={onButtonClick}
            {...buttonProps}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Grid>

    {imageUrl && (
      <Grid item xs={12} sm={5}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 320, sm: 350, md: 375 },
            maxHeight: 400,
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={altText}
            loading="lazy"
            onLoad={(e) => e.target.classList.add('loaded')}
            sx={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: 0,
              transition: 'opacity 0.3s ease-in',
              '&.loaded': { opacity: 1 },
              ...imageProps.sx,
            }}
            {...imageProps}
          />
          {!imageUrl && <Skeleton variant="rectangular" width="100%" height="100%" />}
        </Box>
      </Grid>
    )}
  </Grid>
);

export default BannerSlide
