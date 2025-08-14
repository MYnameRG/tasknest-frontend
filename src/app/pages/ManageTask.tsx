import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";
import { useOutletContext } from "react-router";
import { Save as SaveIcon, AddRounded as AddIcon, UpdateRounded as UpdateIcon, CancelRounded as CancelIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import type { NotificationModel } from "../interfaces/Notification.model";
import type { DialogModel } from "../interfaces/Dialog.model";
import { red } from "@mui/material/colors";

type Context = {
    tasks: Task[],
    isTaskError: boolean,
    fetchTasks: Function
    createTask: Function,
    deleteTask: Function,
    updateTask: Function,
    setNotification: Dispatch<SetStateAction<NotificationModel>>,
    dialog: DialogModel,
    setDialog: Dispatch<SetStateAction<DialogModel>>
};

const ManageTask: FC<any> = () => {
    const { tasks, isTaskError, fetchTasks, createTask, deleteTask, updateTask, setNotification, dialog, setDialog } = useOutletContext<Context>();

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleOnManageTask = (task: Task | undefined) => {
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
                        minRows={2}
                        placeholder="Add Description"
                        id="description"
                        defaultValue={task && task?.content}
                        style={{ width: '100%', height: 100, padding: 10 }}
                        inputMode="text"
                    />

                    <br />
                    <br />
                    <FormControl>
                        <InputLabel id="category">Age</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            input={<OutlinedInput label="Category" />}
                            style={{
                                width: '100%',
                                margin: 0
                            }}
                        >
                            <MenuItem value={""}>None</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </>
            ),
            handleSubmit: async (data: FormData) => {
                const title = data.get("title")?.toString() || "";
                const content = data.get("description")?.toString() || "";

                if (task) {
                    await updateTask(task?.tid as string, {
                        title,
                        content
                    });

                    if (isTaskError) {
                        return setNotification({ type: 'danger', message: 'Task is not updated !!', isOpen: true });
                    }

                    setNotification({ type: 'success', message: 'Updated the task sucessfully !!', isOpen: true });
                } else {
                    await createTask({
                        title,
                        content
                    });

                    if (isTaskError) {
                        return setNotification({ type: 'danger', message: 'Task is not created !!', isOpen: true });
                    }

                    setNotification({ type: 'success', message: 'Added the task sucessfully !!', isOpen: true });
                }

                setDialog({ ...dialog, isOpen: false });
            },
        });
    }

    const handleOnDeleteTask = async (taskId: string) => {
        await deleteTask(taskId);

        if (isTaskError) {
            return setNotification({ type: 'danger', message: 'Task is not deleted !!', isOpen: true });
        }

        setNotification({ type: 'success', message: 'Deleted the task sucessfully !!', isOpen: true });
    }

    return (
        <>
            <Header />
            {/* Show Sub-Header */}
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
                        onClick={() => handleOnManageTask(undefined)}
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
                                        <ClearIcon onClick={() => handleOnDeleteTask(task?.tid as string)} />
                                    </IconButton>
                                }
                                title={task?.title}
                                subheader={task?.createdAt?.toLocaleString()}
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
                                    Updated On: {task?.updatedAt?.toLocaleString()}
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