import { Box } from '@mui/system'
import { Container, Grid, Typography, Link } from '@mui/material'
import { AppDownloadButton } from './components'
import { footerData } from 'views/Home/data/data'

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: '#222935',
      width: '100%',
      height: { xs: 'auto', lg: 320 },
    }}
  >
    <Container sx={{ height: '100%' }}>
      <Grid container spacing={2} sx={{ py: 5, px: 2 }}>
        {/* Logo and Description Section */}
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box component="img" src="/images/logo.svg" alt="logo" sx={{ height: 50, mb: 2 }} />
            <Typography
              variant="subtitle1"
              sx={{
                color: (theme) => theme.palette.grey[500],
                mb: 2,
                fontSize: 15,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis
              mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
              <AppDownloadButton />
            </Box>
          </Box>
        </Grid>

        {/* Dynamic Footer Links */}
        {footerData.map(({ sizing, key, columnTitle, columnLinks }) => (
          <Grid item lg={sizing.lg} md={sizing.md} sm={sizing.sm} xs={sizing.xs} key={key}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                sx={{
                  color: 'white',
                  mb: 2,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {columnTitle}
              </Typography>
              <Box>
                {columnLinks.map((link, index) => (
                  <Link href="#" sx={{ textDecoration: 'none' }} key={index}>
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
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)

export default Footer
