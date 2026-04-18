import { ThemeProvider } from './context/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SplashLoader from './components/SplashLoader.jsx'
import App from './App.jsx'

const Root = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Root;
