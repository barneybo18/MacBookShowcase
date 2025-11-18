import NavBar from './components/Navbar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import gsap  from 'gsap'
import { ScrollTrigger} from 'gsap/all'
import Showcase from './components/Showcase'
import Highlights from './components/Highlights'
import Footer from './components/Footer'
import Performance from './components/Performance'
import Features from './components/Features'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
  <main>
    <NavBar />
    <Hero />
    <ProductViewer />
    <Showcase />
    <Performance />
    <Features />
    <Highlights />
    <Footer />
  </main>  
  )
}

export default App