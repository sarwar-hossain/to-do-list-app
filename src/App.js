import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [input, setInput] = useState("");

  //Collect prevuese data form localstorage
  const [output, setOutput] = useState(()=>{
    const saveoutput=localStorage.getItem("output");
    return saveoutput ? JSON.parse(saveoutput):[];
  });


  //Add all data in output data
  const addData = () => {
    if(input.trim()){
      setOutput([...output, input]);
    setInput("");
    }
    else{
      alert("Enter text");
    }
  }

  // To store data in localstoreage
   useEffect(()=>{
    localStorage.setItem("output", JSON.stringify(output))
   }, [output])

   //deleter single data
  const dfun = (index) => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      const newOutput = output.filter((_, i) => i !== index);
      setOutput(newOutput);
    }
  };

  //Clear all data
  const clearAll =()=>{
      if(window.confirm("Are you sure you want to delete all items?")){
        setOutput([]);
      }
  }
   

  return (
    <>

      <div className='header'>

        <h1>To  Do List App</h1>

        <input
          type='text'
          placeholder='Enter text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <button onClick={addData} className='submit'>Submit</button>

        <button onClick={clearAll} className='clear-btn'>Clear All</button>

      </div>
      
      <br/><br/><br/><br/><br/><br/><br/>

      <div className='output'>
        {output.map((text, index) => (
          <p key={index}>{text}
          <button onClick={()=>dfun(index)} className='delete-btn'>Delete</button>
          </p>
        ))}

      </div>

    </>
  )
}


export default App
