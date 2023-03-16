import { ButtonBase, Box, Typography } from '@mui/material'
const AppDownloadButton = () => {
  const buttonData = [
    {
      logoSrc: '/images/Google_Play-Icon-Logo.svg',
      imgAlt: 'Google Play Logo',
      topText: 'Get it on',
      bottomText: 'Google play',
      url: 'https://play.google.com',
      key: 1,
    },
    {
      logoSrc: '/images/App_Store_(iOS)-Logo.svg',
      imgAlt: 'App Store Logo',
      topText: 'Download it on',
      bottomText: 'App Store',
      url: 'https://www.apple.com/app-store',
      key: 2,
    },
  ]
  return buttonData.map((data) => {
    return (
      <ButtonBase onClick={() => window.open(data.url, '_blank')} key={data.key}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ bgcolor: 'secondary.dark', px: 1, py: 0.5, my: 1, mr: 2, borderRadius: 2, gap: 0.5 }}
        >
          <Box component="img" src={data.logoSrc} alt={data.imgAlt} sx={{ width: 35, height: 35 }} />
          <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ p: 0.5 }}>
            <Typography color="white" fontSize={8}>
              {data.topText}
            </Typography>
            <Typography color="white" fontWeight="bold">
              {data.bottomText}
            </Typography>
          </Box>
        </Box>
      </ButtonBase>
    )
  })
}

export default AppDownloadButton
