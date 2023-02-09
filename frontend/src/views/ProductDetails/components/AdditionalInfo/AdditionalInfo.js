import { Box, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import { Description, Comment } from './components'
import { DUMMY_REVIEWS } from './data'

const AdditionalInfo = ({ product }) => {
  const tabsData = [
    { title: 'Description', content: <Description product={product} />, key: 1 },
    { title: 'Reviews', content: <Comment reviews={DUMMY_REVIEWS} />, key: 2 },
  ]

  const [value, setValue] = useState('0')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const TabPanel = ({ children, value, index }) => {
    return <Box>{value === index && <>{children}</>}</Box>
  }

  return (
    <Box sx={{ mt: 10 }}>
      <TabContext value={value}>
        <Tabs onChange={handleChange} value={value} aria-label="product info tabs">
          {tabsData.map((tab, index) => {
            return <Tab sx={{ textTransform: 'capitalize' }} label={tab.title} value={index.toString()} key={tab.key} />
          })}
        </Tabs>
        {tabsData.map((tab, index) => (
          <TabPanel value={value} index={index.toString()} key={tab.key}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

export default AdditionalInfo
