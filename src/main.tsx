import { createRoot } from 'react-dom/client';
import './main.css';
import { BrowserRouter } from 'react-router';
import AppRoutes from './app/routes/App.route.tsx';
import { Provider } from 'react-redux';
import store from '../src/app/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </BrowserRouter>,
)
