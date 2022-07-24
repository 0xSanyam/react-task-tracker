import Header from "./components/Header";
// import React from "react";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTasks from "./components/AddTasks";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [addButton, setAddButton] = useState(false);
    const [tasks, setTask] = useState([]);
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

    useEffect(() => {
        const getTasks = async () => {
            const getTasksFromServer = await fetchTasks();
            setTask(getTasksFromServer);
        };
        getTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async () => {
        const response = await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`);
        const data = await response.json();
        return data;
    };

    // Fetch a Task
    const fetchTask = async (id) => {
        const response = await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`);
        const data = await response.json();
        return data;
    };

    // Add Task
    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 984652) + 1;
        // const newTask = { id, ...task };

        // setTask([...tasks, newTask]);

        const response = await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await response.json();

        setTask([...tasks, data]);
    };

    // Delete Task
    const deleteTasks = async (id) => {
        await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`, {
            method: "DELETE",
        });

        setTask(tasks.filter((task) => task.id !== id));
    };

    // Reminder true/false
    const flipReminder = async (id) => {
        const taskToFlip = await fetchTask(id);
        const updateTask = { ...taskToFlip, reminder: !taskToFlip.reminder };
        const response = await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updateTask),
        });

        const data = await response.json();
        // ".map((task) => )" [(task) -- for each task in tasks]
        // ...task --> spread across all task
        setTask(
            tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task))
        );
    };

    return (
        // if both true then only show &&
        <Router>
            <div className="container">
                <Header onAddClick_pro={() => setAddButton(!addButton)} openAdd_pro={addButton} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                {addButton && <AddTasks onSubmit_pro={addTask} />}
                                {tasks.length > 0 ? (
                                    <Tasks
                                        tasks_pro={tasks}
                                        onDelete_pro={deleteTasks}
                                        onDoubleClick_pro={flipReminder}
                                    />
                                ) : (
                                    "No tasks to show"
                                )}
                            </>
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

// class App extends React.Component {
//     render() {
//         return <h1>Hello</h1>;
//     }
// }

export default App;
