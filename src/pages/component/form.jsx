  // const [name, setName] = useState("");
  // const[DisplayName, setDisplayName] = useState("");
  // const handleClick = () => {
  //   setDisplayName(name);  
  // };

  //  const [age, setAge] = useState(0)
  {/* <p>Name:{name}</p>
          <p>age:{age}</p>
              
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} ></input>
          
              <button onClick={(handleClick) => setAge(age + 1)}>Click</button> */}


// import React, { useState, useEffect } from 'react';

import React,{ createContext, useContext, useState } from "react";

      const ThemeContext = createContext();
    function Form() {  
  const [theme, setTheme] = useState("light");

 return(
    <ThemeContext.Provider value={theme}>
      <h1>Welcome to My APP</h1>
      <button onClick={() => setTheme("dark")}>Change to dark Theme</button>
      <Child/>
    </ThemeContext.Provider> 
  );
  };
  function Child () {
    return(
      <div>
        <h2>I am a child!</h2>
      <GrandChild/>
      </div>
    );
  };
  function GrandChild(){
    const theme = useContext(ThemeContext);
    return <p>Theme: {theme}</p>
  }
export default Form;
