import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { NursingApp } from './NursingApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NursingApp />
    </BrowserRouter>
  </React.StrictMode>,
)
