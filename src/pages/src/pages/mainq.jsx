import React, { useState } from 'react';
import '../pages/welcome.jsx';
import '../pages/quiz.jsx'


function App() {
  const [name, setName] = useState('');

  return (
    <div className="App">
      {name ? <Quiz name={name} /> : <Welcome onStart = setName} />}
    </div>
  );
}

export default App;
