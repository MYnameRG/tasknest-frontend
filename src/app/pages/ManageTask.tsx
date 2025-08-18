import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";
import { useOutletContext } from "react-router";
import {
    Save as SaveIcon,
    AddRounded as AddIcon,
    UpdateRounded as UpdateIcon,
    CancelRounded as CancelIcon,
    Clear as ClearIcon,
    Category as CategoryIcon,
    PriorityHigh as PriorityHighIcon,
    DateRange as DateRangeIcon
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import type { NotificationModel } from "../interfaces/Notification.model";
import type { DialogModel } from "../interfaces/Dialog.model";
import { red } from "@mui/material/colors";
import { Category, Priority } from "../shared/enums/task.enum";

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
                    <FormControl
                        sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name="category"
                            defaultValue={task && task?.category}
                            input={<OutlinedInput label="Category" />}
                        >
                            {
                                Category?.map(tag => (
                                    <MenuItem key={tag?.id} value={tag?.value}>{tag?.id}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <br />
                    <br />
                    <FormControl style={{
                        width: '100%',
                        margin: 0
                    }}>
                        <InputLabel id="priority">Priority</InputLabel>
                        <Select
                            labelId="priority"
                            id="priority"
                            name="priority"
                            defaultValue={task && task?.priority}
                            input={<OutlinedInput label="Priority" />}
                        >
                            {
                                Priority?.map(priority => (
                                    <MenuItem key={priority?.id} value={priority?.value}>{priority?.id}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <br />
                    <br />
                    <FormControl sx={{ m: 0, width: '100%' }} variant="outlined">
                        <OutlinedInput
                            id="deadline"
                            name="deadline"
                            endAdornment={<InputAdornment position="end">{'Deadline'}</InputAdornment>}
                            defaultValue={task && task?.deadline}
                            label="Deadline"
                            type="date"
                        />
                    </FormControl>
                </>
            ),
            handleSubmit: async (data: FormData) => {
                const title = data.get("title")?.toString() || "";
                const content = data.get("description")?.toString() || "";
                const category = data.get("category")?.toString() || "";
                const priority = Number(data.get("priority")?.toString());
                const deadline = data.get("deadline")?.valueOf() || null;

                if (task) {
                    await updateTask(task?.tid as string, {
                        title,
                        content,
                        category,
                        priority,
                        deadline
                    });

                    if (isTaskError) {
                        return setNotification({ type: 'danger', message: 'Task is not updated !!', isOpen: true });
                    }

                    setNotification({ type: 'success', message: 'Updated the task sucessfully !!', isOpen: true });
                } else {
                    await createTask({
                        title,
                        content,
                        category,
                        priority,
                        deadline
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
                                padding: '10px',
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
                                <Stack direction="row" sx={{ marginBottom: 1 }} spacing={1}>
                                    {(task?.category && <Chip icon={<CategoryIcon />} size="small" label={Category?.find(category => category?.value == task?.category)?.id} color="primary" variant="outlined" />)}
                                    {(task?.priority > -1 && <Chip icon={<PriorityHighIcon />} size="small" label={Priority?.find(priority => priority?.value == task?.priority)?.id} color="success" variant="outlined" />)}
                                </Stack>
                                <Stack sx={{ marginBottom: 1 }} direction="row" spacing={1}>
                                    {(task?.deadline && <Chip icon={<DateRangeIcon />} size="small" label={task?.deadline?.toString()} color="error" variant="outlined" />)}
                                </Stack>
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