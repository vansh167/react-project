import { useState, useEffect } from 'react';
import '../style/Crud.css';
import Header from '../component/header';

let Project2 = () => {
  const [form, setForm] = useState({
    profile: '',       // 🟩 lowercase key here
    name: '',
    age: '',
    salary: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    salary: '',
    role: '',
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['React.js', 'HTML', 'CSS', 'JS',];

  useEffect(() => {
    const savedData = localStorage.getItem('crudData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crudData', JSON.stringify(data));
  }, [data]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(prev =>
      prev.includes(value)
        ? prev.filter(opt => opt !== value)
        : [...prev, value]
    );
  };

  // 🟩 Image upload handler - store base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, profile: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
const handleSubmit = () => {
  // validate form as before...
  const entry = { ...form, languages: selectedOptions };

  if (editIndex !== null) {
    const userId = data[editIndex].id;
    fetch(`http://localhost:4000/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
      .then(res => res.json())
      .then(updatedUser => {
        const updatedData = [...data];
        updatedData[editIndex] = updatedUser;
        setData(updatedData);
        setEditIndex(null);
        handleReset();
      });
  } else {
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
      .then(res => res.json())
      .then(newUser => {
        setData(prev => [...prev, newUser]);
        handleReset();
      });
  }
};


  const handleEdit = (index) => {
    const item = data[index];
    setForm({
      profile: item.profile || '',
      name: item.name,
      age: item.age,
      salary: item.salary,
      role: item.role,
    });
    setSelectedOptions(item.languages || []);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleReset = () => {
    setForm({ profile: '', name: '', age: '', salary: '', role: '' });
    setEditIndex(null);
    setErrors({ name: '', age: '', salary: '', role: '' });
    setSelectedOptions([]);
  };
  const handleView = (item) => {
    const message = `
Name: ${item.name}
Age: ${item.age}
Salary: ${item.salary}
Role: ${item.role}
Languages: ${item.languages?.join(', ') || 'None'}
    `;
    alert(message);
  };
  return (
    <>
      <Header />
      <h1 style={{ backgroundColor: 'lightpink' }}>React Crud Operation</h1>
      <div className="main">
        <div className="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleFormChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
          <br />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleFormChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
          <br />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleFormChange}
          />
          {errors.salary && <div className="error">{errors.salary}</div>}
          <br />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleFormChange}
          />
          {errors.role && <div className="error">{errors.role}</div>}
          <br />

          {/* Languages checkboxes */}
          <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ width: '100%' }}>Select programming languages:</h3>
            {options.map((option) => (
              <label
                key={option}
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type="checkbox"
                  name="language"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Profile picture upload - outside the checkboxes */}
          <div style={{ margin: '10px 0' }}>
            <label><strong>Upload Profile Picture:</strong></label><br />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {form.profile && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={form.profile}
                  alt="Profile Preview"
                  width="80"
                  height="80"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          <div className="btn">
            <button onClick={handleSubmit}>
              {editIndex !== null ? 'Update' : 'Submit'}
            </button>
            <button
              style={{ backgroundColor: 'rgb(64,207,64)' }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table section */}
        <div className="form2">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>🟩Sr.No</th>       {/* 🟩 first Sr.No */}
                <th>👤Profile</th>     {/*  then Profile */}
                <th>📝Name</th>
                <th>🎂Age</th>
                <th>💰Salary</th>
                <th>🧑‍💼Role</th>
                <th>💻Languages</th>
                <th>⚙️Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>No data found</td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td> {/* Sr.No */}
                    <td>
                      {item.profile ? (
                        <img
                          src={item.profile}
                          alt="Profile"
                          width="50"
                          height="50"
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.salary}</td>
                    <td>{item.role}</td>
                    <td>{item.languages?.join(', ')}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(index)}
                        style={{
                          backgroundColor: 'rgb(93, 188, 226)',
                          color: 'white',
                          borderRadius: '10px',
                          height: '30px',
                          width: '70px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        style={{
                          backgroundColor: 'rgb(219, 54, 54)',
                          color: 'white',
                          borderRadius: '10px',
                          height: '30px',
                          width: '70px',
                         
                        }}
                      >
                        Delete
                      </button>
                        <button
                      onClick={() => handleView(item)}
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        borderRadius: '10px',
                        height: '30px',
                        width: '70px',
                      }}
                    >
                      View
                    </button>
                    </td>wz
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Project2;
