import { CssBaseline } from '@mui/material';
import './App.css';
import AlertPopup from './components/Notification';
import { useState } from 'react';
import type { Notification } from './models/Notification.model';
import { Outlet } from 'react-router';
import type { Task } from './models/Task.model';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notification, setNotification] = useState<Notification>({} as Notification);

  return (
    <>
      <CssBaseline />
      <AlertPopup notification={notification} setNotification={setNotification} />
      <Outlet context={{ tasks: tasks, setTasks: setTasks, setNotification: setNotification }} />
    </>
  )
}

export default App;
