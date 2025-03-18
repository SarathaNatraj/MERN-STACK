import React, { useState } from "react";

function App() {
  // State to manage student list
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  
  // Function to handle input change for student name
  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };
  
  // Function to add a new student
  const addStudent = () => {
    if (studentName.trim()) {
      setStudents([...students, studentName]);
      setStudentName("");  // Reset the input field
    }
  };
  
  // Function to remove a student by index
  const removeStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  return (
    <div className="App">
      <h1>Student Dashboard</h1>
      
      {/* Input field to enter student name */}
      <input 
        type="text" 
        value={studentName} 
        onChange={handleNameChange} 
        placeholder="Enter student name"
      />
      <button onClick={addStudent}>Add Student</button>
      
      {/* Display the list of students */}
      <ul>
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index}>
              {student} 
              <button onClick={() => removeStudent(index)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No students added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
