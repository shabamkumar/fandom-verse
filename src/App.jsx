import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import SideNav from './components/SideNav'
import MenuOverlay from './components/MenuOverlay'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'

const Category = lazy(() => import('./pages/Category'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const TrailersPage = lazy(() => import('./pages/TrailersPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const MerchPage = lazy(() => import('./pages/MerchPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])
  return null
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/trailers" element={<TrailersPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/merch" element={<MerchPage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
          <SideNav />
        <MenuOverlay />
        <TopBar />
        <main id="app">
          <Suspense fallback={null}><AppRoutes /></Suspense>
        </main>
        <Chatbot />
        <Modal />
        <Toast />
        <Footer />
      </HashRouter>
    </AppProvider>
  )
}
