// import { useState } from "react";


// function App() {
//   const[task, setTask] = useState("");
//   const[taskList, setTaskList] = useState([]);

//   const handleSubmit = () => {
//     if (task.trim() ==="") return;
//     const newTask = {
//       id: Date.now(),
//       text: task,
//     };
//     setTaskList([...taskList, newTask]);
//     setTask("");
//   }
 
//   setTaskList([...taskList, newTask]);
//   setTask("");
 
//   return (
//     <>
// <h1>Todo2</h1>
// <div>
//   <lable>
//     <input type="text" placeholder="Add" value={task} onChange={(e) => setTask(e.target.value)} />
//     <button onClick={handleSubmit}> {isEditing ? "updates" : "+"} </button>
//   </lable>
// </div>
//   <ul>
//   {taskList.map((item) => (
//     <li key={item.id}>{item.text}
//     <button onClick={() => handleEdit(item.id)}>Edit</button></li>
//   ))}
// </ul>
 
//     </>
//   )
// }

// export default App;
