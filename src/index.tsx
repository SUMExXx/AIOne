import './index.css'; // import css
import { createRoot } from "react-dom/client";
import App from './app';
import { AIProvider } from './context/AIContext';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AIProvider>
    <App />
  </AIProvider>
);