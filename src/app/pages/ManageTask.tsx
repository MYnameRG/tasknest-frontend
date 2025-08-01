import { type Dispatch, type FC, type SetStateAction, type SyntheticEvent } from "react";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";
import { useOutletContext } from "react-router";
import { Save as SaveIcon, AddRounded as AddIcon, UpdateRounded as UpdateIcon, CancelRounded as CancelIcon } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardHeader, TextareaAutosize, TextField, Typography } from "@mui/material";
import type { NotificationModel } from "../models/Notification.model";
import type { DialogModel } from "../models/Dialog.model";
import { red } from "@mui/material/colors";

type Context = {
    tasks: Task[],
    dialog: DialogModel,
    setTasks: Dispatch<SetStateAction<Task[]>>,
    setNotification: Dispatch<SetStateAction<NotificationModel>>,
    setDialog: Dispatch<SetStateAction<DialogModel>>
};

const ManageTask: FC<any> = () => {
    const { tasks, dialog, setTasks, setNotification, setDialog } = useOutletContext<Context>();

    const openManageTaskDialog = (_?: SyntheticEvent | Event) => {
        setDialog({
            isOpen: true,
            title: 'Add New Task',
            subTitle: 'New Task will be created from this place.',
            submitIconComponent: <SaveIcon />,
            submitBtnText: 'Save',
            cancelIconComponent: <CancelIcon />,
            closeBtnText: "Cancel",
            modalBody: (
                <>
                    <TextField
                        label="Title"
                        name="title"
                        placeholder="Add Title"
                        id="title"
                        inputMode="text"
                        style={{ width: 500 }}
                    />

                    <br />
                    <br />
                    <TextareaAutosize
                        name="description"
                        minRows={3}
                        placeholder="Description"
                        id="description"
                        style={{ width: 500, height: 100, padding: 10 }}
                        inputMode="text"
                    />
                </>
            ),
            handleSubmit: async (data: FormData) => {
                const title = data.get("title")?.toString() || "";
                const content = data.get("description")?.toString() || "";

                await new Promise((resolve, _) => setTimeout(() => resolve(null), 1000));

                setTasks([...tasks, {
                    tid: tasks?.length,
                    title,
                    content,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }]);

                setDialog({ ...dialog, isOpen: false });

                setNotification({ type: 'success', message: 'Added the task sucessfully !!', isOpen: true });
            },
        });
    }

    return (
        <>
            <Header />

            <Box
                className="heading-bar"
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    mx: 5
                }}>
                <Box
                    component="h1"
                    sx={{
                        display: 'flex',
                        width: "50%",
                    }}>
                    Manage Task
                </Box>

                <Box
                    className="button-groups"
                    component="h1"
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        width: '50%'
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        startIcon={<UpdateIcon />}>
                        Update Task
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        onClick={openManageTaskDialog}
                        startIcon={<AddIcon />}>
                        Add Task
                    </Button>
                </Box>
            </Box>

            <Box
                className="task-list-box"
                component="div"
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridAutoColumns: 'min-content',
                    padding: "2rem",
                }}
            >
                {
                    tasks.map((task) => (
                        <Card
                            key={task?.tid}
                            variant="outlined"
                            sx={{
                                display: 'inline-block',
                                padding: '20px',
                                marginRight: '8px',
                                width: 240,
                                maxWidth: 300
                            }}>
                            <CardHeader style={{ padding: 0, textAlign: "left" }}
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        R
                                    </Avatar>
                                }
                                title={task?.title}
                                subheader={task?.createdAt.toLocaleString()}
                            />

                            <br />
                            <CardContent style={{ padding: 0, textAlign: "left" }} sx={{ height: "100%" }}>
                                <Typography variant="body2" color="text.secondary">
                                    {task?.content}
                                </Typography>

                                <br />

                                <Typography variant="body2" color="text.secondary">
                                    Updated On: {task?.updatedAt.toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box>
        </>
    );
};

export default ManageTask;