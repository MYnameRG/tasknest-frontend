import { createRoot } from 'react-dom/client';
import './main.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from './app/routes/App.route.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
)
