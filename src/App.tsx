import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/Toast'
import Navbar     from '@/components/Navbar'
import Footer     from '@/components/Footer'
import ChatBot    from '@/components/ChatBot'
import MouseGlow  from '@/components/MouseGlow'
import AuthModal  from '@/components/AuthModal'
import ScrollPopup from '@/components/ScrollPopup'
import HomePage    from '@/pages/HomePage'
import ServicesPage  from '@/pages/ServicesPage'
import PortfolioPage from '@/pages/PortfolioPage'
import PricingPage   from '@/pages/PricingPage'
import AboutPage     from '@/pages/AboutPage'
import ContactPage   from '@/pages/ContactPage'

type AuthTab = 'signin' | 'register'

export default function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab,  setAuthTab]  = useState<AuthTab>('signin')

  function openAuth(tab: AuthTab = 'signin') {
    setAuthTab(tab)
    setAuthOpen(true)
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <MouseGlow />

          <Navbar onOpenAuth={openAuth} />

          <Routes>
            <Route path="/"          element={<HomePage    onOpenAuth={openAuth} />} />
            <Route path="/services"  element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/pricing"   element={<PricingPage onOpenAuth={openAuth} />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/contact"   element={<ContactPage />} />
            {/* Legacy Spanish routes — redirect gracefully */}
            <Route path="/servicios"  element={<ServicesPage />} />
            <Route path="/portafolio" element={<PortfolioPage />} />
            <Route path="/precios"    element={<PricingPage onOpenAuth={openAuth} />} />
            <Route path="/nosotros"   element={<AboutPage />} />
            <Route path="/contacto"   element={<ContactPage />} />
          </Routes>

          <Footer />
          <ChatBot />
          <ScrollPopup onOpenAuth={() => openAuth('register')} />
          <AuthModal
            open={authOpen}
            onClose={() => setAuthOpen(false)}
            defaultTab={authTab}
          />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
