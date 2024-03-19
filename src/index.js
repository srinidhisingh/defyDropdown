import React from 'react'
import ReactDOM from 'react-dom/client'
import ThrottleApp from './ThrottleApp.jsx'
import './index.css'
import DebounceApp from './DebounceApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>Run stub server in your local environment via command:  node server.js</div>
    <ThrottleApp />
    <DebounceApp />
    
  </React.StrictMode>,
)
