import { useState } from "react";
import Content from "../../components/Content";
import Header from "../../components/Header";

import type { Task } from "../../models/Task.model";

const Main = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            <Header />
            <Content tasks={tasks} setTasks={setTasks} />
        </>
    );
};

export default Main;