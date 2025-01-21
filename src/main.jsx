import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import PostAdForm from './pages/postads'
// import Header from './pages/homrpsge'
// import ProductList from './pages/product'
// import Header from './components/homrpsge'
// import ProductList from './pages/product'
// import Header from './components/header'
// import HomePage from './pages/HomePage'
// import Profile from './pages/Profile'
import ProductDetails from './pages/ProductDetails'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductDetails />
  </StrictMode>,
)
