import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Header from "../components/Header";
import { red } from "@mui/material/colors";
import { useOutletContext } from "react-router";
import type { Task } from "../models/Task.model";
import { type Dispatch, type SetStateAction } from "react";

type Context = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    setNotification: Dispatch<SetStateAction<Notification>>
};

const Dashboard = () => {
    const { tasks } = useOutletContext<Context>();

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
                        height: "18rem",
                        overflow: 'auto'
                    }}
                >
                    {
                        tasks.map((task) => (
                            <Card key={task?.tid} variant="outlined" sx={{ display: 'inline-block', padding: '20px', marginRight: '8px', width: 240, maxWidth: 300 }}>
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

                <h1>Archieve</h1>
                <Box
                    className="archieve-box"
                    component="div"
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: 'min-content',
                        height: "18rem",
                        overflow: 'auto'
                    }}
                >
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;