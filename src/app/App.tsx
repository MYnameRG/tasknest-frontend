import { CssBaseline } from '@mui/material';
import './App.css';
import Notification from './components/Notification';
import { useState } from 'react';
import type { NotificationModel } from './interfaces/Notification.model';
import { Outlet } from 'react-router';
import type { Task } from './models/Task.model';
import Dialog from './components/Dialog';
import type { DialogModel } from './interfaces/Dialog.model';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notification, setNotification] = useState<NotificationModel>({} as NotificationModel);
  const [dialog, setDialog] = useState<DialogModel>({} as DialogModel);

  return (
    <>
      <CssBaseline />
      <Dialog dialog={dialog} setDialog={setDialog} />
      <Notification notification={notification} setNotification={setNotification} />
      <Outlet context={{ tasks: tasks, dialog: dialog, setTasks: setTasks, setNotification: setNotification, setDialog: setDialog }} />
    </>
  )
}

export default App;
