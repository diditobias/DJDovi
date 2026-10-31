import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Music from './sections/Music'
import Gallery from './sections/Gallery'
import Events from './sections/Events'
import Booking from './sections/Booking'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <Gallery />
        <Events />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
