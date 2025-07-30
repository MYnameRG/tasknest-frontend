import { useActionState, type Dispatch, type FC, type SetStateAction } from "react";
import type { Task } from "../models/Task.model";
import { Avatar, Box, Button, Card, CardContent, CardHeader, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Save as SaveIcon } from '@mui/icons-material';
import { red } from "@mui/material/colors";
// import type { Notification } from "../models/Notification.model";

type Props = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>
}

const Content: FC<Props> = ({ tasks, setTasks }) => {
    const handleSubmit = async (_: any, formData: FormData) => {
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

        // setNotification({ type: 'success', message: 'Added the task sucessfully !!', isOpen: true });
    };

    const [_, formAction, isPending] = useActionState(handleSubmit, undefined);

    return (
        <>
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

                <br />
                <hr />
                <Box
                    component="section"
                    sx={{
                        padding: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                        gap: 6,
                    }}>
                    {
                        tasks.map((task) => (
                            <Card key={task?.tid} style={{ padding: 20, width: 250, maxWidth: 300 }}>
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
            </Box>
        </>
    );
};

export default Content;