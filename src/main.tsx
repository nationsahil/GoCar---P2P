import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure 'root' matches the ID in index.html
const rootElement = document.getElementById('root');

// Check that rootElement is not null before creating the root
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error("Failed to find the root element. Check the 'id' in index.html and ensure it's 'root'.");
}