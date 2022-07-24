import { FaTimes } from "react-icons/fa";

function Task(props) {
    return (
        <div
            className={`task_c ${props.task_pro2.reminder ? `reminder` : ""}`}
            onDoubleClick={() => props.onDoubleClick_pro2(props.task_pro2.id)}
        >
            <h3>
                {props.task_pro2.text}{" "}
                <FaTimes
                    style={{ color: "maroon", cursor: "pointer" }}
                    onClick={() => props.onDelete_pro2(props.task_pro2.id)}
                />
            </h3>
            <p>{props.task_pro2.day}</p>
        </div>
    );
}

export default Task;
