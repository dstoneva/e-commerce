/* eslint-disable import/no-anonymous-default-export */
export default (theme) => ({
  // you can safely use all props from the default theme
  MuiTextField: {
    defaultProps: {
      size: 'small',
      variant: 'outlined',
    },
  },
})
