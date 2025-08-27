import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Header from "../components/Header";
import { red } from "@mui/material/colors";
import { useOutletContext } from "react-router";
import type { Task } from "../models/Task.model";
import { useEffect, type Dispatch, type Key, type SetStateAction } from "react";
import type { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_TASKS } from "../redux/slices/task.slice";
import type { NotificationModel } from "../interfaces/Notification.model";

type Context = {
    useAIMode: boolean,
    tasks: Task[],
    fetchTasks: Function,
    setUseAIMode: Dispatch<SetStateAction<boolean>>,
    setTasks: Dispatch<SetStateAction<Task[]>>,
    setNotification: Dispatch<SetStateAction<NotificationModel>>
};

const Dashboard = () => {
    const { setNotification } = useOutletContext<Context>();

    const dispatchAction = useDispatch<AppDispatch>();
    const { tasks } = useSelector((state: any) => state?.tasks);

    useEffect(() => {
        (async () => {
            try {
                await dispatchAction(FETCH_TASKS()).unwrap();
            }
            catch (error: any) {
                return setNotification({ type: 'error', message: error?.message, isOpen: true });
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <h1>Dashboard Page</h1>
            <Box
                component="section"
                sx={{
                    padding: '20px'
                }}>

                <h1>Recent</h1>
                <Box
                    className="recent-box"
                    component="div"
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: 'min-content',
                        height: "15rem",
                        overflow: 'auto'
                    }}
                >
                    {
                        tasks.map((task: Task, index: Key) => (
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
                                <CardHeader style={{ padding: 0, textAlign: "left" }}
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }}>
                                            R
                                        </Avatar>
                                    }
                                    title={task?.title}
                                    subheader={task?.createdAt?.toLocaleString()}
                                />

                                <br />

                                <CardContent style={{ padding: 0, textAlign: "left" }} sx={{ height: "100%" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {task?.content}
                                    </Typography>

                                    <br />

                                    <Typography variant="body2" color="text.secondary">
                                        Updated On: {task?.updatedAt?.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Box>

                <h1>Archieve</h1>
                <Box
                    className="archieve-box"
                    component="div"
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: 'min-content',
                        height: "15rem",
                        overflow: 'auto'
                    }}
                >
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;