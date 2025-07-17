import { useState } from "react";
import Header from "../component/header";

import '../style/calculator.css';
import Usestate from "./example";

let Calculate = () => {
  const [value, setValue] = useState('');

  // Handles number and zero clicks with leading zero check
  const handleNumberClick = (num) => {
    if (value === '' || value === "0") {
      // If current value is empty or just "0"
      if (num === "0" || num === "00") {
        // Don't add more leading zeros
        setValue("0");
      } else {
        // Replace "0" or empty with the new number
        setValue(num);
      }
    } else {
      setValue(value + num);
    }
  };

  // Handles the decimal point, only one allowed
  const handleDotClick = () => {
    // Prevent multiple dots in the current number segment
    // We'll split by operators to check the current segment
    const operators = ["+", "-", "*", "/"];
    let lastOperatorIndex = -1;
    for (let op of operators) {
      const idx = value.lastIndexOf(op);
      if (idx > lastOperatorIndex) lastOperatorIndex = idx;
    }
    const currentNumber = value.slice(lastOperatorIndex + 1);

    if (!currentNumber.includes(".")) {
      setValue(value + ".");
    }
  };

  return (
    <>
      <Header />
      <h1>Calculator</h1>
      <div className="calcu">
        <div>
          <input type="text" value={value} readOnly />
        </div>
        <br />
        <hr />
        <div className="btn">
          <input type="button" value="AC" onClick={() => setValue('')} />
          <input type="button" value="DE" onClick={() => setValue(value.slice(0, -1))} />
          <input type="button" value="." onClick={handleDotClick} />
          <input type="button" value="/" onClick={() => setValue(value + "/")} />
        </div>
        <div className="btn">
          <input type="button" value="7" onClick={() => handleNumberClick("7")} />
          <input type="button" value="8" onClick={() => handleNumberClick("8")} />
          <input type="button" value="9" onClick={() => handleNumberClick("9")} />
          <input type="button" value="*" onClick={() => setValue(value + "*")} />
        </div>
        <div className="btn">
          <input type="button" value="4" onClick={() => handleNumberClick("4")} />
          <input type="button" value="5" onClick={() => handleNumberClick("5")} />
          <input type="button" value="6" onClick={() => handleNumberClick("6")} />
          <input type="button" value="+" onClick={() => setValue(value + "+")} />
        </div>
        <div className="btn">
          <input type="button" value="1" onClick={() => handleNumberClick("1")} />
          <input type="button" value="2" onClick={() => handleNumberClick("2")} />
          <input type="button" value="3" onClick={() => handleNumberClick("3")} />
          <input type="button" value="-" onClick={() => setValue(value + "-")} />
        </div>
        <div className="btn">
          <input type="button" value="00" onClick={() => handleNumberClick("00")} />
          <input type="button" value="0" onClick={() => handleNumberClick("0")} />
          <input
            type="button"
            value="="
            style={{ width: '140px' }}
            onClick={() => {
              try {
                // Remove leading zeros from each number in the expression before eval
                const sanitizedValue = value.replace(/\b0+(\d)/g, '$1');
                // eslint-disable-next-line no-eval
                setValue(eval(sanitizedValue).toString());
              } catch (error) {
                setValue("Error");
              }
            }}
          />
        </div>
      </div>
      <Usestate/>
    </>
  );
};

export default Calculate;