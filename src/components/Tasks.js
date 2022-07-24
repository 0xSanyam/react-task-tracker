import Task from "./Task";

const Tasks = (props) => {
    return (
        // can't do tasks.push() because state is immutable
        // rather we recreate it (setTask)
        <>
            {props.tasks_pro.map((task) => (
                <Task
                    key={task.id}
                    task_pro2={task}
                    onDelete_pro2={props.onDelete_pro}
                    onDoubleClick_pro2={props.onDoubleClick_pro}
                />
            ))}
        </>
    );
};

export default Tasks;
