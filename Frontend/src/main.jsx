import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from './Contexts/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      < App />
    </ AuthProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </BrowserRouter>
)
