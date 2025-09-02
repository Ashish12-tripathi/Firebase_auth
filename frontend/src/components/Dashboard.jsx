import React, { useEffect, useState } from "react";
import "./style.css";

const Dashboard = ({ idToken, backendUrl }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [userInfo, setUserInfo] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${backendUrl}/tasks`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`${backendUrl}/admin/me`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setUserInfo(data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!newTask.title) return;
    try {
      await fetch(`${backendUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Update task
  const updateTask = async (id, updatedTitle) => {
    try {
      await fetch(`${backendUrl}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ title: updatedTitle }),
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${backendUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUserInfo();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {userInfo && (
        <div className="user-info">
          <h3>Welcome, {userInfo.email}</h3>
          <p>Role: {userInfo.role}</p>
        </div>
      )}

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button
                onClick={() =>
                  updateTask(task._id, prompt("Enter new title:", task.title))
                }
              >
                Update
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
