import { Box, Typography } from '@mui/material'

const Headline = ({ children, icon, additionalComponent, sx, ...rest }) => {
  return (
    <Typography
      variant="h2"
      sx={{ fontSize: '25px !important', fontWeight: 700, ...sx }}
      component={Box}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
      {...rest}
    >
      <Box display="flex" alignItems="center" sx={{ fontSize: 'inherit' }}>
        {icon && (
          <Box display="flex" alignItems="center" mr={1}>
            {icon}
          </Box>
        )}
        {children}
      </Box>
      {additionalComponent && <div>{additionalComponent}</div>}
    </Typography>
  )
}

export default Headline
