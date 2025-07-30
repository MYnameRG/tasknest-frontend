import { CssBaseline } from '@mui/material';
import './App.css';
import AlertPopup from './components/Notification';
import { useState } from 'react';
import type { Notification } from './models/Notification.model';
import { Outlet } from 'react-router';

const App = () => {
  const [notification, setNotification] = useState<Notification>({} as Notification);

  return (
    <>
      <CssBaseline />
      <AlertPopup notification={notification} setNotification={setNotification} />
      <Outlet context={{ setNotification: setNotification }} />
    </>
  )
}

export default App;
