import { Box } from '@mui/system'
import { Container, Grid, Typography, Link } from '@mui/material'
import { AppDownloadButton } from './components'
import { footerData } from 'views/Home/data/data'

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#222935', width: '100%', height: { xs: 'auto', lg: '320px' } }}>
      <Container sx={{ height: '100%' }}>
        <Grid container spacing={2} sx={{ py: 5, px: 2 }}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Box component="img" src="/images/logo.svg" alt="logo" sx={{ height: 50, mb: 2 }} />
              <Typography variant="subtitle" sx={{ color: (theme) => theme.palette.grey[500], mb: 2, fontSize: 15 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis
                mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
                <AppDownloadButton />
              </Box>
            </Box>
          </Grid>
          {footerData.map((data) => {
            return (
              <Grid item lg={data.sizing.lg} md={data.sizing.md} sm={data.sizing.sm} xs={data.sizing.xs} key={data.key}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ color: 'white', mb: 2, fontSize: 18, fontWeight: 700 }}>
                    {data.columnTitle}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {data.columnLinks.map((link) => {
                      return (
                        <Link href="#" sx={{ textDecoration: 'none' }} key={link}>
                          <Typography
                            sx={{
                              color: (theme) => theme.palette.grey[500],
                              '&:hover': { color: '#fff' },
                              mb: 1,
                              fontSize: 15,
                            }}
                            variant="subtitle1"
                          >
                            {link}
                          </Typography>
                        </Link>
                      )
                    })}
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
