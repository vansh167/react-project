import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Path from './component/nav'

// import App from './pages/mainq'
// import Welcome from './pages/quiz'
// import App from './pages/example'

// import UseState from './component/useState'

// import App from './App'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Path/>
  
    {/* <App/> */}
  </StrictMode>
)
