import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await api.getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    await api.createTask(task);
    loadTasks();
  };

  const handleUpdate = async (id, updates) => {
    await api.updateTask(id, updates);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.deleteTask(id);
    loadTasks();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>
      <TaskForm onCreate={handleCreate} />
      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
