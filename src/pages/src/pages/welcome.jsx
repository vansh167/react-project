import { useState } from "react";
import Header from "../component/header";
import '../style/quiz.css'

function Welcome({onStart}) {
    const [ name, setName] = useState('');

 const handleSubmit =() => {
        if (name.trim()) {
            onStart(name);
        }
 }
    return(
        <>
       <Header/>
       <div className="welcome">
        <div className="welcome1">
        <h2>Welcome to Quiz!</h2>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target .value)}/>
        <button onClick={handleSubmit}>Start Quiz</button>
        </div> </div></>
    )
};
export default Welcome;