import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import Root from './Root.jsx'

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) {
  ReactGA.initialize(gaId);
}

createRoot(document.getElementById('root')).render(<Root />);