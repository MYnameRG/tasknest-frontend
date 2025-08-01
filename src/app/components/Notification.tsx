import { type Dispatch, type FC, type SetStateAction, type SyntheticEvent } from 'react';
import { Alert, Slide, Snackbar, type SnackbarCloseReason } from '@mui/material';
import type { SlideProps } from '@mui/material/Slide';
import type { NotificationModel } from '../models/Notification.model';

type Props = {
    notification: NotificationModel,
    setNotification: Dispatch<SetStateAction<NotificationModel>>
}

const Notification: FC<Props> = ({ notification, setNotification }) => {
    const handleClose = (_?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        setNotification({ ...notification, isOpen: false });
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <div className='alert-message'>
            <Snackbar
                open={notification?.isOpen}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={6000}
                slots={{ transition: (props: SlideProps) => <Slide {...props} direction="left" /> }}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification?.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Notification;