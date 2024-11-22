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
      /* Custom Scrollbar Styles */
      '::-webkit-scrollbar': {
        width: '8px', // Width of the vertical scrollbar
        height: '5px', // Height of the horizontal scrollbar
      },
      '::-webkit-scrollbar-track': {
        background: '#f0f0f0', // Light background for contrast
      },
      '::-webkit-scrollbar-thumb': {
        background: 'rgba(125, 138, 138, 0.2)', // Darker scrollbar handle
        borderRadius: '4px', // Slight rounding for softer appearance
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#c2c2c2', // Darken on hover
      },
    },
  },
});
