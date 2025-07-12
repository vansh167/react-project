import React from "react";

const Welcome = ({ userName, setUserName, onStart }) => {
  const handleStart = () => {
    // Save name to backend
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to save user");
        }
        return response.json();
      })
      .then(data => {
        console.log("User saved:", data);
        onStart(); // Now start quiz
      })
      .catch(error => {
        console.error("Error saving user:", error);
      });
  };

  return (
    <div className="welcome-screen">
      <h2>Welcome to the Quiz!</h2>
      <input
        type="text"
        value={userName}
        placeholder="Enter your name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleStart} disabled={!userName}>
        Start Quiz
      </button>
    </div>
  );
};

export default Welcome;
