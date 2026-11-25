import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { SettingsProvider } from './context/SettingsContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Templates from './pages/Templates'
import TemplateDetail from './pages/TemplateDetail'
import Software from './pages/Software'
import SoftwareDetail from './pages/SoftwareDetail'
import Categories from './pages/Categories'
import CategoryPage from './pages/CategoryPage'
import Search from './pages/Search'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import CustomDevelopment from './pages/CustomDevelopment'
import RequestQuote from './pages/RequestQuote'
import Contact from './pages/Contact'
import RequestDemo from './pages/RequestDemo'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Account from './pages/account/Account'
import Purchases from './pages/account/Purchases'
import Downloads from './pages/account/Downloads'
import Licenses from './pages/account/Licenses'
import Billing from './pages/account/Billing'
import AdminDashboard from './pages/admin/Dashboard'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import ServicesHubPage from './pages/services/ServicesHubPage'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
import LocationsHubPage from './pages/locations/LocationsHubPage'
import LocationDetailPage from './pages/locations/LocationDetailPage'
import BlogListPage from './pages/blog/BlogListPage'
import BlogPostPage from './pages/blog/BlogPostPage'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import Faq from './pages/Faq'
import { useAnalyticsTracker } from './hooks/useAnalyticsTracker'
import ErrorBoundary from './components/common/ErrorBoundary'

function AnalyticsTracker() {
  useAnalyticsTracker()
  return null
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminAuthProvider>
          <SettingsProvider>
            <CartProvider>
              <WishlistProvider>
            <Router>
              <AnalyticsTracker />
              <Routes>
              {/* Main Layout Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="templates" element={<Templates />} />
                <Route path="templates/:slug" element={<TemplateDetail />} />
                <Route path="software" element={<Software />} />
                <Route path="software/:slug" element={<SoftwareDetail />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/:slug" element={<CategoryPage />} />
                <Route path="search" element={<Search />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cart" element={<Cart />} />
                <Route path="custom-development" element={<CustomDevelopment />} />
                <Route path="request-quote" element={<RequestQuote />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="projects" element={<Portfolio />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="faq" element={<Faq />} />
                <Route path="request-demo" element={<RequestDemo />} />

                {/* SEO Service Landing Pages */}
                <Route path="services" element={<ServicesHubPage />} />
                <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />

                {/* Local SEO Landing Pages */}
                <Route path="locations" element={<LocationsHubPage />} />
                <Route path="locations/:locationSlug" element={<LocationDetailPage />} />

                {/* SEO Blog & Content Marketing */}
                <Route path="blog" element={<BlogListPage />} />
                <Route path="blog/:postSlug" element={<BlogPostPage />} />
                
                {/* Account Routes */}
                <Route path="account" element={<Account />} />
                <Route path="account/purchases" element={<Purchases />} />
                <Route path="account/downloads" element={<Downloads />} />
                <Route path="account/licenses" element={<Licenses />} />
                <Route path="account/billing" element={<Billing />} />
              </Route>

              {/* Auth Layout Routes */}
              <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Admin Layout Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Dedicated Isolated Landing Page Route */}
              <Route path="/landing" element={<LandingPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#111827',
                color: '#FFFFFF',
                border: '1px solid #374151',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#F7F8FC',
                },
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </SettingsProvider>
  </AdminAuthProvider>
</AuthProvider>
</ErrorBoundary>
  )
}

export default App
