import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import PaymentForm from './pages/Payment'
import HomePage from './pages/HomePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
