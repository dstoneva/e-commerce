const DisplayCurrency = ({ number }) => {
  return new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'EUR' }).format(number)
}

export default DisplayCurrency
