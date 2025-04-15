import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import

const OLXRazorpayPayment = ({ product }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Product details (would typically come from props)
  const productDetails = product || {
    id: 'prod_123',
    title: 'iPhone 13 Pro',
    price: 79900, // in paise (₹799.00)
    description: 'Like new condition, 256GB',
    image: 'https://example.com/iphone.jpg'
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    setLoading(true);

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // 2. Create order on your backend
      const orderResponse = await axios.post('https://your-api.com/create-razorpay-order', {
        amount: productDetails.price,
        currency: 'INR',
        receipt: `order_${productDetails.id}_${Date.now()}`,
        notes: {
          productId: productDetails.id,
          buyerName: name,
          buyerEmail: email,
          buyerPhone: phone
        }
      });

      // 3. Initialize Razorpay checkout
      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Replace with your test/live key
        amount: productDetails.price,
        currency: 'INR',
        name: 'OLX Clone',
        description: productDetails.title,
        image: 'https://example.com/your-logo.png',
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            // Verify payment on your backend
            await axios.post('https://your-api.com/verify-payment', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              productId: productDetails.id
            });
            
            // Navigate to success page after successful payment
            navigate('/payment-success', { 
              state: { 
                product: productDetails,
                paymentDetails: response,
                buyerInfo: { name, email, phone }
              }
            });
          } catch (error) {
            // Navigate to failure page if verification fails
            navigate('/payment-failed', { 
              state: { 
                error: 'Payment verification failed',
                product: productDetails
              }
            });
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: '#002f34', // OLX brand color
        },
        modal: {
          ondismiss: () => {
            // Handle when user closes the payment modal
            console.log('Payment modal closed by user');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      // Navigate to error page if payment initiation fails
      navigate('/payment-error', { 
        state: { 
          error: error.message,
          product: productDetails
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // ... (rest of your component code remains the same)
};

export default OLXRazorpayPayment;