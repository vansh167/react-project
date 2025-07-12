import { useEffect, useState } from "react";
import '../style/quiz.css';
import Header from "../component/header";
import Welcome from "./quizWelcome"; // Make sure this file exists

const Quiz = () => {
  const [data, setData] = useState([]); // Stores quiz questions
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question
  const [selectedOption, setSelectedOption] = useState(null); // Selected answer
  const [isStarted, setIsStarted] = useState(false); // Controls Welcome vs Quiz
  const [userName, setUserName] = useState(""); // Stores user's name

  const currentQuestion = data[currentIndex]; // Get current question

  // Fetch quiz data from backend
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
q
  return (
    <>
      <Header />

      {!isStarted ? (
        // Welcome screen before quiz starts
        <Welcome
          userName={userName}
          setUserName={setUserName}
          onStart={() => setIsStarted(true)}
        />
      ) : (
        // Quiz screen after "Start Quiz" is clicked
        <div className="welcome2">
          <div className="welcome3">
            {currentQuestion ? (
              <div>
                <h3>{currentQuestion.question}</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {currentQuestion.options.map((option, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name="quiz-option"
                          value={option}
                          onChange={() => setSelectedOption(option)}
                          checked={selectedOption === option}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>

                {/* Next button - disabled until user selects an option */}
                <button
                  onClick={() => {
                    setCurrentIndex(currentIndex + 1);
                    setSelectedOption(null);
                  }}
                  disabled={!selectedOption}
                >
                  Next
                </button>
              </div>
            ) : (
              <p>Name:{userName}<br/>
             </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
