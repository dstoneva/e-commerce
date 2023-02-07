import { PageLayout } from 'layouts/Main/components'
import { Carousel } from './components'

const Home = () => {
  return (
    <>
      <Carousel />
      <PageLayout container isAsync={false}/>
    </>
  )
}

export default Home
