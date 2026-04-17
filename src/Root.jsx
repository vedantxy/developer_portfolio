import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import SplashLoader from './components/SplashLoader.jsx'
import App from './App.jsx'

const Root = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
