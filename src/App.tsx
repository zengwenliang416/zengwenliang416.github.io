import CustomCursor from './components/CustomCursor'
import AuroraBackground from './components/AuroraBackground'
import Navigation from './components/Navigation'
import SideElements from './components/SideElements'
import Hero from './components/Hero'
import WhatIBuild from './components/WhatIBuild'
import Stats from './components/Stats'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Publications from './components/Publications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <CustomCursor />
      <AuroraBackground />
      <Navigation />
      <SideElements />
      <main className="md:cursor-none">
        <Hero />
        <WhatIBuild />
        <Stats />
        <TechStack />
        <Projects />
        <Publications />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
