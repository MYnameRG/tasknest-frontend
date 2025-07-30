import { CssBaseline } from '@mui/material';
import './App.css';
import Dashboard from './pages/main/Main';
import AlertPopup from './components/Notification';
import { useState } from 'react';
import type { Notification } from './models/Notification.model';
// import Auth from './pages/authorization/Auth';

function App() {
  const [notification, setNotification] = useState<Notification>({} as Notification);

  return (
    <>
      <CssBaseline />
      <AlertPopup notification={notification} setNotification={setNotification} />
      {/* <Auth /> */}
      <Dashboard setNotification={setNotification} />
    </>
  )
}

export default App;
