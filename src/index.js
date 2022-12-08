import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGE_ID = process.env.REACT_APP_FIREBASE_MESSAGE_ID
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_ID,
  appId: FIREBASE_APP_ID,
  databaseUrl: FIREBASE_DATABASE_URL
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);