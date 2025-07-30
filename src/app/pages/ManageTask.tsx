import { useState, type FC } from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import type { Task } from "../models/Task.model";

const ManageTask: FC<any> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            <Header />
            <Content tasks={tasks} setTasks={setTasks} />
        </>
    );
};

export default ManageTask;