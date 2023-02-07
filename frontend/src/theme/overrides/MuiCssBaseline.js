/* eslint-disable import/no-anonymous-default-export */
export default (theme) => ({
  // you can safely use all props from the default theme
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: 'smooth',
      },
      p: {
        lineHeight: 1.75,
      },
      button: {
        fontFamily:
          'Open Sans,Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
        fontSize: 14,
      },
      '.MuiRating-sizeSmall': {
        fontSize: '20px',
      },
      a: {
        textDecoration: 'none',
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
      '.slick-list': {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  },
})
