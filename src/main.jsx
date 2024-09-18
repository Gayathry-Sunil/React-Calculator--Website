import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: use 'react-dom/client' for React 18+
import './index.css'; // Import global CSS styles
import App from './App'; // Import the root component

// Get the root element from index.html
const rootElement = document.getElementById('root');

// Create a root to render the React application
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
