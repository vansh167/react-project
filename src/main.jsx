import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
// import Path from './component/nav'
import App from './App';
const domain = 'dev-8qeqhbfe3klx8n5j.us.auth0.com'
const clientId = 'cn8yHw0iVVdjGOpb9fnqJqpFdEwtwCal'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}>
    <App/>
    </Auth0Provider>
    {/* <Path/> */}
  
    
  </StrictMode>
)
