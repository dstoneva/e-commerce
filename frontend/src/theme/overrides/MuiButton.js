/* eslint-disable import/no-anonymous-default-export */
export default (theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
      sizeLarge: {
        padding: '.6rem 2.5rem',
      },
    },
    defaultProps: {
      color: 'inherit',
    },
  },
})
