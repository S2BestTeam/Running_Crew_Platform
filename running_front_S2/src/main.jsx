import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Global } from '@emotion/react'
import { global } from './styles/global.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Global styles={global}/>
    <App />
  </BrowserRouter>
)
