/**
 * 🏛️ TRAVEL4U SOVEREIGN APP & LUXURY REVENUE LAB — FIREBASE CLIENT CONFIG
 * Domain: travel4u.us / app.travel4u.us
 * Project: travel4you-app (Firebase / Google Cloud)
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

export const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyCsBDuTJy3kCsU9hf7O1WzUU0VJl35tqxs",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "travel4you-app.firebaseapp.com",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "travel4you-app",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "travel4you-app.firebasestorage.app",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "357293574901",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:357293574901:web:2bdea8691f0e4efd3613bc",
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WEFV3F1N45"
};

export const FIREBASE_SDK_URLS = {
  app: "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js",
  auth: "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js",
  firestore: "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js",
  analytics: "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js"
};
