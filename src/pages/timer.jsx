import React from 'react'
import '../style/timer.css'
function Timer() {
    const handleSubmit ={
        a=3,
        b=5,
        console.log(a+b),
    }
    }
  return (
    <>
    <div className='timer'>
        <h1>STOP WATCH</h1>
            <h2><label>00:00:00.00</label></h2> 
            <br/>
            <h5> <pre>hr  min  sec   </pre></h5>
       <br/>
       <button className='btn1' onClick={handleSubmit}>{editIndex !== null ? '⏵' : '❚❚'}</button>
       <button className='btn2'>🚩</button>
       <button className='btn3'>↺</button>
     </div>
     </>
  )
}

export default Timer