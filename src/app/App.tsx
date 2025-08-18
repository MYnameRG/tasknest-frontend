import { CssBaseline } from '@mui/material';
import './App.css';
import Notification from './components/Notification';
import { useState } from 'react';
import type { NotificationModel } from './interfaces/Notification.model';
import { Outlet } from 'react-router';
import Dialog from './components/Dialog';
import type { DialogModel } from './interfaces/Dialog.model';
import { useTaskService } from './hooks/useTaskService';
import { useAuthService } from './hooks/useAuthService';

const App = () => {
  const { user, logoutUser, isLoading: isUserLoading, isError: isUserError, registerUser, loginUser } = useAuthService();
  const { tasks, fetchTasks, isError: isTaskError, createTask, deleteTask, updateTask } = useTaskService();
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
        tasks,
        user,
        logoutUser,
        registerUser,
        loginUser,
        isUserError,
        isTaskError,
        fetchTasks,
        createTask, 
        deleteTask, 
        updateTask,
        setNotification,
        isUserLoading,
        dialog,
        setDialog
      }} />
    </>
  )
}

export default App;
