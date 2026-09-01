import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 1. Library import ki

// Tumhari Client ID jo abhi Google Cloud se mili thi
const CLIENT_ID = "791654442936-mig6akh6rljemdqtimftce3vh855ka6m.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Pure app ko GoogleOAuthProvider ke andar wrap kar diya */}
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);