import { CssBaseline } from '@mui/material';
import './App.css';
import Notification from './components/Notification';
import { useState } from 'react';
import type { NotificationModel } from './interfaces/Notification.model';
import { Outlet } from 'react-router';
import Dialog from './components/Dialog';
import type { DialogModel } from './interfaces/Dialog.model';

const App = () => {
  const [notification, setNotification] = useState<NotificationModel>({} as NotificationModel);
  const [dialog, setDialog] = useState<DialogModel>({} as DialogModel);
  const [useAIMode, setUseAIMode] = useState(false);

  return (
    <>
      <CssBaseline />
      <Dialog dialog={dialog} setDialog={setDialog} />
      <Notification notification={notification} setNotification={setNotification} />
      <Outlet context={{
        useAIMode,
        setUseAIMode,
        setNotification,
        dialog,
        setDialog
      }} />
    </>
  )
}

export default App;
