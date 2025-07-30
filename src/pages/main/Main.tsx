import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import Content from "../../components/Content";
import Header from "../../components/Header";
import type { Task } from "../../models/Task.model";
import type { Notification } from "../../models/Notification.model";

type Props = {
    setNotification: Dispatch<SetStateAction<Notification>>
}

const Main: FC<Props> = ({ setNotification }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            <Header />
            <Content tasks={tasks} setTasks={setTasks} setNotification={setNotification} />
        </>
    );
};

export default Main;