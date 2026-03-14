import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import SplashLoader from './components/SplashLoader.jsx'
import App from './App.jsx'

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5-second delay for the loader

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {isLoading ? <SplashLoader /> : <App />}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
