import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  // Collect previous data from localStorage
  const [output, setOutput] = useState(() => {
    const savedOutput = localStorage.getItem("output");
    return savedOutput ? JSON.parse(savedOutput) : [];
  });

  // State for the success message
 

  // Add data to output list
  const addData = () => {
    if (input.trim()) {
      setOutput([...output, input]);
      setInput("");
      setMessage("Task added successfully!");
      setTimeout(() => setMessage(""), 2000); // Hide message after 3 seconds
    } else {
      alert("Enter text");
    }
  }

  // Store data in localStorage
  useEffect(() => {
    localStorage.setItem("output", JSON.stringify(output));
  }, [output]);

  // Delete a task
  const dfun = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newOutput = output.filter((_, i) => i !== index);
      setOutput(newOutput);
      setMessage("Task deleted successfully!");
      setTimeout(() => setMessage(""), 2000); // Hide message after 3 seconds
    }
  };

  // Clear all tasks
  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all items?")) {
      setOutput([]);
      setMessage("All tasks deleted successfully!");
      setTimeout(() => setMessage(""), 2000); // Hide message after 3 seconds
    }
  }

  return (
    <>
      <div className='header'>
        <h1>To-Do List App</h1>

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

     

      <div className='output'>
        {output.map((text, index) => (
          <p key={index}>
            {text}
            <button onClick={() => dfun(index)} className='delete-btn'>Delete</button>
          </p>
        ))}
      </div>

    

      {/* Success message display */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}
    </>
  );
}

export default App;
