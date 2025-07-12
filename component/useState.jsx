// import { useState } from 'react';


// let Project1 = () => {
//   const [form, setForm] = useState({name: '',age: '',salary: '',role: '' });

//   const [errors, setErrors] = useState({
//     name: '',
//     age: '',
//     salary: '',
//     role: ''
//   });

//   const [data, setData] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     let newErrors = {};
//     let hasError = false;

//     if (!form.name.trim()) {
//       newErrors.name = 'Name is required';
//       hasError = true;
//     }
//     if (!form.age) {
//       newErrors.age = 'Age is required';
//       hasError = true;
//     }
//     if (!form.salary) {
//       newErrors.salary = 'Salary is required';
//       hasError = true;
//     }
//     if (!form.role.trim()) {
//       newErrors.role = 'Role is required';
//       hasError = true;
//     }

//     if (hasError) {
//       setErrors(newErrors);
//       return;
//     }

//     setErrors({ name: '', age: '', salary: '', role: '' });

//     if (editIndex !== null) {
//       const updatedData = [...data];
//       updatedData[editIndex] = form;
//       setData(updatedData);
//       setEditIndex(null);
//     } else {
//       setData([...data, form]);
//     }

//     setForm({ name: '', age: '', salary: '', role: '' });
//   };

//   const handleEdit = (index) => {
//     setForm(data[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedData = data.filter((_, i) => i !== index);
//     setData(updatedData);
//   };

//   const handleReset = () => {
//     setForm({ name: '', age: '', salary: '', role: '' });
//     setEditIndex(null);
//     setErrors({ name: '', age: '', salary: '', role: '' });
//   };

//   return (
//     <>
//       <h1>React Crud Operation</h1>
//       <div className="main">
//         <div className="form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//           />
//           {errors.name && <div className="error">{errors.name}</div>}
//           <br />

//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={form.age}
//             onChange={handleChange}
//           />
//           {errors.age && <div className="error">{errors.age}</div>}
//           <br />

//           <input
//             type="number"
//             name="salary"
//             placeholder="Salary"
//             value={form.salary}
//             onChange={handleChange}
//           />
//           {errors.salary && <div className="error">{errors.salary}</div>}
//           <br />

//           <input
//             type="text"
//             name="role"
//             placeholder="Role"
//             value={form.role}
//             onChange={handleChange}
//           />
//           {errors.role && <div className="error">{errors.role}</div>}
//           <br />

//           <div className="btn">
//             <button onClick={handleSubmit}>
//               {editIndex !== null ? 'Update' : 'Submit'}
//             </button>
//             <button style={{ backgroundColor: 'tomato' }} onClick={handleReset}>
//               Reset
//             </button>
//           </div>
//         </div>

//         <div className="form2">
//           <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
//             <thead>
//               <tr>
//                 <th>Sr.No</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Salary</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.name}</td>
//               <td>{item.age}</td>
//               <td>{item.salary}</td>
//               <td>{item.role}</td>
//               <td>
//                 <button
//                   onClick={() => handleEdit(index)}
//                   style={{ backgroundColor: 'rgb(187, 177, 85)' }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(index)}
//                   style={{ backgroundColor: 'rgb(173, 17, 43)', color: 'white' }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Project1;
import { useState } from 'react';
import '../Crud.css';
let Project = () => {
const [inputText, setInputText] = useState(""); //to track user input
const [task, setTasks] = useState([]);  //to store list to task
const [editIndex, setEditIndex] = useState(null);
//finction run when button clicked
const handleAddTask = () => {
  if (inputText.trim() !=="") {
  if(editIndex !== null){
    //edit mode
    const updatedTasks = [...task];
    updatedTasks[editIndex] = inputText;
    setTasks(updatedTasks);
    setEditIndex(null);
  } else {
    //Add mode
    setTasks([...task, inputText]);
  }
  setInputText(""); //clear input field
  }
};

const handleDelete = (index)=> {
  const updatedTasks =task.filter((_, i) => i !== index);
  setTasks(updatedTasks);
};
const handleEdit = (index)=> {
  setInputText(task[index]);
  setEditIndex(index);
}
  return(
<>

<h1>ToDo application</h1> 
<div className="manage">
<label>
      <input type="text" placeholder="Enter your task" value={inputText} onChange={(e) => setInputText(e.target.value)} /> 
      <button onClick={handleAddTask}>{editIndex !==null ? "update" : "+"}</button>
</label>
<ul>
  {task.map((task, index)=> (
    <li key={index}>
      <p>{task}</p>
      <button onClick={()=> handleEdit(index)}>Edit</button>
      <button onClick={()=> handleDelete(index)}>Delete</button>
  
    </li>
  ))}
</ul>
</div>
</>

  )
    }
    export default Project