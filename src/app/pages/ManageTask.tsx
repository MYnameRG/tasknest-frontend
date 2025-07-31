import { useActionState, type Dispatch, type FC, type SetStateAction } from "react";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";
import { useOutletContext } from "react-router";
import { Save as SaveIcon, AddRounded as AddIcon, UpdateRounded as UpdateIcon } from '@mui/icons-material';
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import type { Notification } from "../models/Notification.model";

type Context = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    setNotification: Dispatch<SetStateAction<Notification>>
};

const ManageTask: FC<any> = () => {
    const { tasks, setTasks, setNotification } = useOutletContext<Context>();
    const [_, formAction, isPending] = useActionState(
        async (_: any, formData: FormData) => {
            const title = formData.get("title")?.toString() || "";
            const content = formData.get("description")?.toString() || "";

            await new Promise((resolve, _) => setTimeout(() => resolve(null), 1000));

            setTasks([...tasks, {
                tid: tasks?.length,
                title,
                content,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);

            setNotification({ type: 'success', message: 'Added the task sucessfully !!', isOpen: true });
        }, undefined);

    return (
        <>
            <Header />
            <Box
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
                    <Button variant="contained" sx={{ mx: 1 }} startIcon={<UpdateIcon />}>Update Task</Button>
                    <Button variant="contained" sx={{ mx: 1 }} startIcon={<AddIcon />}>Add Task</Button>
                </Box>
            </Box>
            <Box
                component="article">
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    action={formAction}
                >
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

                    <br />
                    <br />
                    <Button
                        type="submit"
                        color="secondary"
                        loading={isPending}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ManageTask;