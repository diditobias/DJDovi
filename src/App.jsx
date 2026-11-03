import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Hero from './sections/Hero'
import About from './sections/About'
import Setup from './sections/Setup'
import Gallery from './sections/Gallery'
import Booking from './sections/Booking'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Setup />
        <Gallery />
        <Booking />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
