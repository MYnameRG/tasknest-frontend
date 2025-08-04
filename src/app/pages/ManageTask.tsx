import { type Dispatch, type FC, type SetStateAction } from "react";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";
import { useOutletContext } from "react-router";
import { Save as SaveIcon, AddRounded as AddIcon, UpdateRounded as UpdateIcon, CancelRounded as CancelIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, TextareaAutosize, TextField, Typography } from "@mui/material";
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

    const handleOnManageTask = (task: Task | null) => {
        setDialog({
            isOpen: true,
            title: (task && 'Edit Task') || 'Add New Task',
            subTitle: null,
            submitIconComponent: (task && <UpdateIcon />) || <SaveIcon />,
            submitBtnText: (task && 'Update') || 'Save',
            cancelIconComponent: <CancelIcon />,
            closeBtnText: "Cancel",
            modalBody: (
                <>
                    <TextField
                        label="Title"
                        name="title"
                        placeholder="Add Title"
                        id="title"
                        defaultValue={task && task?.title}
                        inputMode="text"
                        style={{
                            width: '100%',
                            margin: 0
                        }}
                    />

                    <br />
                    <br />
                    <TextareaAutosize
                        name="description"
                        minRows={3}
                        placeholder="Description"
                        id="description"
                        defaultValue={task && task?.content}
                        style={{ width: '100%', height: 100, padding: 10 }}
                        inputMode="text"
                    />
                </>
            ),
            handleSubmit: async (data: FormData) => {
                const title = data.get("title")?.toString() || "";
                const content = data.get("description")?.toString() || "";

                await new Promise((resolve, _) => setTimeout(() => resolve(null), 1000));

                const _task = tasks.find((t: Task) => t?.tid == task?.tid);
                if (_task) {
                    _task.title = title;
                    _task.content = content;
                    _task.updatedAt = new Date();
                }

                if (task) {
                    const updatedList = tasks?.filter((t: Task) => t?.tid != task?.tid);
                    setTasks([...updatedList, { ..._task }]);

                    setNotification({ type: 'success', message: 'Updated the task sucessfully !!', isOpen: true });
                } else {
                    setTasks([...tasks, {
                        tid: tasks?.length.toString(),
                        title,
                        content,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }])

                    setNotification({ type: 'success', message: 'Added the task sucessfully !!', isOpen: true });
                }

                setDialog({ ...dialog, isOpen: false });
            },
        });
    }

    const handleOnDeleteTask = (taskId: string) => {
        setTasks([...tasks?.filter(task => taskId != null && task?.tid != taskId.toString())]);
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
                        onClick={() => handleOnManageTask(null)}
                        startIcon={<AddIcon />}>
                        Add Task
                    </Button>
                </Box>
            </Box>

            {/* List of Tasks */}
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
                    tasks.map((task, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                display: 'inline-block',
                                padding: '20px',
                                marginRight: '8px',
                                width: 240,
                                maxWidth: 300
                            }}>
                            <CardHeader
                                style={{ padding: 0, textAlign: "left" }}
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton className="delete-icon">
                                        <ClearIcon onClick={() => handleOnDeleteTask(task?.tid)} />
                                    </IconButton>
                                }
                                title={task?.title}
                                subheader={task?.createdAt.toLocaleString()}
                            />

                            <br />
                            <CardContent
                                style={{
                                    padding: 0,
                                    textAlign: "left"
                                }}>
                                <Typography variant="body2" color="text.secondary">
                                    {task?.content}
                                </Typography>

                                <br />

                                <Typography variant="body2" color="text.secondary">
                                    Updated On: {task?.updatedAt.toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                padding: 0,
                                margin: '15px 0 0 0'
                            }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleOnManageTask(task)}
                                    startIcon={<UpdateIcon />}>
                                    Update
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </Box>
        </>
    );
};

export default ManageTask;