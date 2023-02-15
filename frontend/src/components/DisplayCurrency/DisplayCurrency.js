const DisplayCurrency = ({ number }) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
}

export default DisplayCurrency
