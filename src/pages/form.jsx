import { useState, useEffect } from "react";
import Header from "../component/header";
import EmployeData from "../data/Employedata.js"; 
import '../style/form.css';

const Cont3 = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');   // ✅ Changed from "FirstName" to "firstName"
  const [lastName, setLastName] = useState('');     // ✅ Changed from "LastName" to "lastName"
  const [age, setAge] = useState('0');              // ✅ Changed from "setage" to "setAge" for consistency
  const [id, setId] = useState('0');         
  const [isUpdate, setIsUpdate] = useState(false)       // ✅ Changed from "setid" to "setId"

  useEffect(() => {
    setData(EmployeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined && dt.length > 0) { 
      setIsUpdate(true)       // ✅ Added check for dt.length > 0
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);                 // ✅ Fixed casing: "lastName" (was "LastName")
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handleSave = (e) => {
    let error = '';

    if(firstName === '')
      error += 'first name is required  ';

      if(firstName === '')
      error += 'Last name is required  ';

      if(firstName <= 0 )
      error += 'Age is required  ';
         if(error === '')
         {
      
    e.preventDefault();
    const dt = [...data];
    const newObject = {
       id: EmployeData.length + 1,
    firstName: firstName,
    lastName: lastName,
    age: age
    }
    dt.push(newObject);
    setData(dt);
          }
          else{
            alert(error)
          }
         }
    const handleUpdate= () => {
   const index = data.map((item) => {
    return item.id
   }).indexOf(id)
   const dt = [...data];
   dt[index].firstName = firstName;
    dt[index].lastName = lastName;
     dt[index].age = age;

     setData(dt);
    
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);

  };

  return (
    <>
      <Header />

      <div>
        <label>First name:</label> {/* ✅ Fixed typo: was <lable> */}
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName} // ✅ Fixed: was incorrect "FirstName"
        />
      </div>

      <div>
        <label>Last name:</label> {/* ✅ Fixed typo: was <lable> */}
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName} // ✅ Fixed: was incorrect "LastName"
        />
      </div>

      <div>
        <label>Age:</label> {/* ✅ Fixed typo: was <lable> */}
        <input
          type="text"
          onChange={(e) => setAge(e.target.value)} // ✅ Fixed function name: setAge
          value={age}
        />
      </div>
     {
     !isUpdate ? 
        <button onClick={handleSave}>Save</button> 
        :
        <button onClick={handleUpdate}>Update</button>
     }
    
           {/* ✅ Fixed typo: was <botton> */}
      <button onClick={handleClear}>Clear</button> {/* ✅ Fixed typo: was <botton> */}

      <table>
        <thead>
          <tr>
            <td>Sr.no</td>
            <td>Id</td>
            <td>First name</td>
            <td>Last name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Cont3;
