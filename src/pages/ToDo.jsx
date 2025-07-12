import { useEffect, useState } from "react";
import Header from "../component/header";
import "../style/todo.css";
//local host 4000//
let Todo = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const API = "http://localhost:4000/todo-list";

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTaskList(data));
  }, []);

  const handleCheckBoxChange = (id, currentValue) => {
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: !currentValue })
    })
      .then(() => {
        setTaskList(prev =>
          prev.map(task =>
            task.id === id ? { ...task, checked: !currentValue } : task
          )
        );
      });
  };

  const handleSubmit = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      fetch(`${API}/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task })
      }).then(() => {
        setTaskList(prev =>
          prev.map(t =>
            t.id === editId ? { ...t, text: task } : t
          )
        );
        setIsEditing(false);
        setEditId(null);
        setTask("");
        setError("");
      });
    } else {
      const newTask = {
        text: task,
        checked: false,
      };
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      })
        .then(res => res.json())
        .then(data => {
          setTaskList([...taskList, data]);
          setTask("");
          setError("");
        });
    }
  };

  const handleDelete = (id) => {
    const task = taskList.find(t => t.id === id);
    if (!task?.checked) {
      setError("⚠️ Please check the box before deleting.");
      return;
    }

    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => {
        setTaskList(taskList.filter(task => task.id !== id));
        setError("");

        if (isEditing && id === editId) {
          setIsEditing(false);
          setEditId(null);
          setTask("");
        }
      });
  };

  const handleEdit = (id) => {
    const selectedTask = taskList.find(task => task.id === id);
    setTask(selectedTask.text);
    setIsEditing(true);
    setEditId(id);
    setError("");
  };

  return (
    <>
      <Header />
      <h1>ToDo List</h1>

      <div className="todo">
        <label>
          <input
            type="text"
            placeholder="Add"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleSubmit}>
            {isEditing ? "Update" : "+"}
          </button>
        </label>
      </div>

      <div className="todo2">
        <h2>List</h2>
        <ul>
          {taskList.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              {item.text}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>

              <input
                type="checkbox"
                checked={item.checked || false}
                onChange={() => handleCheckBoxChange(item.id, item.checked)}
                style={{ marginLeft: "10px" }}
              />

              <button
                style={{ marginLeft: "5px" }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default Todo;
