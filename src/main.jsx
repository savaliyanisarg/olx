import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// import HomePage from './pages/HomePage'
// import LoginSignup from './pages/Login'
// import ProductDetails from './pages/ProductDetails'
// import HomePage from './pages/HomePage'
// import PostAdForm from './pages/postads'
import ProfilePage from './pages/Profile'
// import EditProfile from './pages/EditProfile'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfilePage />
  </StrictMode>,
)
