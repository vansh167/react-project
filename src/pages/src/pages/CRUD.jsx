import { useState, useEffect } from 'react';
import '../style/Crud.css';
import Header from '../component/header';

const Project1 = () => {
  // ✅ Added id field to work with JSON Server updates
  const [form, setForm] = useState({ id: '', name: '', age: '', salary: '', role: '' });
  const [errors, setErrors] = useState({ name: '', age: '', salary: '', role: '' });
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ FETCH userData from JSON Server
  useEffect(() => {
    fetch('http://localhost:5000/userData')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Failed to fetch userData", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    let hasError = false;

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      hasError = true;
    }
    if (!form.age) {
      newErrors.age = 'Age is required';
      hasError = true;
    }
    if (!form.salary) {
      newErrors.salary = 'Salary is required';
      hasError = true;
    }
    if (!form.role.trim()) {
      newErrors.role = 'Role is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: '', age: '', salary: '', role: '' });

    if (editIndex !== null) {
      // ✅ PUT request to update user
      fetch(`http://localhost:5000/userData/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(() => fetch('http://localhost:5000/userData'))
        .then(res => res.json())
        .then(data => {
          setData(data);
          setForm({ id: '', name: '', age: '', salary: '', role: '' });
          setEditIndex(null);
        });
    } else {
      // ✅ POST request to add user
      fetch('http://localhost:5000/userData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, age: form.age, salary: form.salary, role: form.role }) // exclude id
      })
        .then(() => fetch('http://localhost:5000/userData'))
        .then(res => res.json())
        .then(data => {
          setData(data);
          setForm({ id: '', name: '', age: '', salary: '', role: '' });
        });
    }
  };

 const handleEdit = (index) => {
  setForm(data[index]); // now form.id will be set too
  setEditIndex(index);
};
const handleDelete = (id) => {
  fetch(`http://localhost:5000/userData/${id}`, { method: 'DELETE' })
    .then(() => fetch('http://localhost:5000/userData'))
    .then(res => res.json())
    .then(data => setData(data));
};
  const handleReset = () => {
    setForm({ id: '', name: '', age: '', salary: '', role: '' });
    setEditIndex(null);
    setErrors({ name: '', age: '', salary: '', role: '' });
  };

  return (
    <>
      <Header />
      <h1>React CRUD Operation (with JSON Server)</h1>
      <div className="main">
        <div className="form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="error">{errors.name}</div>}
          <br />

          <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} />
          {errors.age && <div className="error">{errors.age}</div>}
          <br />

          <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
          {errors.salary && <div className="error">{errors.salary}</div>}
          <br />

          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
          {errors.role && <div className="error">{errors.role}</div>}
          <br />

          <div className="btn">
            <button onClick={handleSubmit}>{editIndex !== null ? 'Update' : 'Submit'}</button>
            
            <button onClick={handleReset} style={{ backgroundColor: 'tomato' }}>Reset</button>
          </div>
        </div>

        <div className="form2">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.salary}</td>
                  <td>{item.role}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Project1;
