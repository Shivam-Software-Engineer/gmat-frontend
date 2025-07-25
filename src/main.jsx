import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './Store/myStore.js'
import './index.css'
import App from './App.jsx';
import Header from './components/header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SecurityWrapper from './components/SecurityWrapper/index.jsx';

createRoot(document.getElementById('root')).render(
  //<StrictMode>


  <Provider store={store}>
    <GoogleOAuthProvider clientId="1085137380996-qi98o796j30ltpto18uv2eobg7i7tka2.apps.googleusercontent.com">
      <SecurityWrapper>
      {/* <Header/> */}
      <App />
      </SecurityWrapper>
    </GoogleOAuthProvider>
    </Provider>
 // </StrictMode>,
)
