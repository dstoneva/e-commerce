export const bannerData = [
  {
    title: '50% Off For Your First Shopping',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.',
    buttonText: 'Shop Now',
    imageUrl: 'https://bazaar.ui-lib.com/assets/images/products/nike-black.png',
    altText: 'Nike black',
    onButtonClick: () => console.log('Navigating to shop now'),
    imageProps: {
      sx: {
        height: { xs: 320, sm: 'auto' },
        maxHeight: { xs: 320, sm: 350, md: 375, lg: 400 },
        width: { xs: '100%' },
        objectFit: 'contain',
      },
    },
  },
  {
    title: 'Exclusive Winter Sale - Up to 70% Off!',
    description: 'Explore our exclusive deals and discounts for the winter season. Don’t miss out on great prices!',
    imageUrl: '/images/winter-sale.webp',
    altText: 'Winter Sale',
    imageProps: {
      sx: {
        height: { xs: 320, sm: 'auto' },
        width: { xs: '100%' },
        objectFit: 'contain',
      },
    },
  },
]

export const featuredBrandsDetails = [
  { title: 'London Britches', imageURL: '/images/london-britches.webp' },
  { title: 'Jim and Jiko', imageURL: '/images/jim-and-jiko.webp' },
]

export const newArrivalsDetails = [
  { title: 'Sunglass', imgURL: '/images/imagegoggles.webp', price: 150 },
  { title: 'Makeup', imgURL: '/images/makeup.webp', price: 250 },
  { title: 'Smart Watch', imgURL: '/images/bgwatch.webp', price: 350 },
  { title: 'Lipstick', imgURL: '/images/lipstick.webp', price: 15 },
  { title: 'Green Plant', imgURL: '/images/plant.webp', price: 55 },
  { title: 'Bonsai Tree', imgURL: '/images/bonsai.webp', price: 535 },
]

export const topRatingsDetails = [
  { title: 'Camera', imgURL: '/images/camera-1.webp', price: 3300 },
  { title: 'Watch', imgURL: '/images/watch-1.webp', price: 999 },
  { title: 'Phone', imgURL: '/images/mobile-1.webp', price: 999 },
  { title: 'Shoe', imgURL: '/images/shoes-2.webp', price: 400 },
]

// src/data/data.js
export const deliveryDetails = [
  {
    id: 1,
    title: 'Worldwide Delivery',
    subtitle: 'We offer competitive prices on our 100 million plus product any range.',
    icon: 'AirportShuttleIcon',
  },
  {
    id: 2,
    title: 'Safe Payment',
    subtitle: 'We offer competitive prices on our 100 million plus product any range.',
    icon: 'PriceCheckIcon',
  },
  {
    id: 3,
    title: 'Shop With Confidence',
    subtitle: 'We offer competitive prices on our 100 million plus product any range.',
    icon: 'LockResetIcon',
  },
  {
    id: 4,
    title: '24/7 Support',
    subtitle: 'We offer competitive prices on our 100 million plus product any range.',
    icon: 'SupportAgentIcon',
  },
]

export const footerData = [
  {
    columnTitle: 'About us',
    columnLinks: ['Careers', 'Our Stores', 'Our Cares', 'Terms & Conditions', 'Privacy Policy'],
    sizing: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 2,
    },
    key: 1,
  },
  {
    columnTitle: 'Customer Care',
    columnLinks: ['Help Center', 'How To Buy', 'Track Your Order', 'Corporate & Bulk Purchasing', 'Returns & Refunds'],
    sizing: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 3,
    },
    key: 2,
  },
  {
    columnTitle: 'Contact Us',
    columnLinks: [
      '70 Washington Square South, New York, NY 10012, United States',
      'Email: uilib.help@gmail.com',
      'Phone: +1 1123 456 780',
    ],
    sizing: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 3,
    },
    key: 3,
  },
]
