import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', age: '', grade: '' });
  
  // Fetch students from API
  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the students', error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission to add new student
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the page from reloading
   fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents([...students, data]);
        setNewStudent({ name: '', email: '', age: '', grade: '' }); // Reset form
      })
      .catch((error) => {
        console.error('There was an error adding the student', error);
      });
  };

  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>

      {/* Form to add a new student */}
      <form className="student-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newStudent.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={handleChange}
          required
        />
        <button className="submit-button" type="submit" onClick={handleSubmit}>Add Student</button>
      </form>

      <h2 className="student-list-title">Student List</h2>
      <ul className="student-list" >
        {students.map((student) => (
          <li key={student._id} className="student-card">
             <span className="student-name">{student.name}</span><br/>
      <span className="student-email">({student.email})</span><br/>
      <span className="student-age">   <i>{student.age} years old </i></span><br/>
      <span className="student-grade"> doing <b>{student.grade}</b></span>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
