import React, { useState, useEffect } from "react";

function UserList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

  // Fetch user data from the Express API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setStudents(data); // Set fetched students to state
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className="App">
      <h1>User Dashboard</h1>
      
      {/* Display loading state */}
      {loading && <p>Loading students...</p>}
      
      {/* Display list of students */}
      <ul>
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index}>
              {student.name} 
              </li>
          ))
        ) : (
          <p>No students available.</p>
        )}
      </ul>
   
    </div>
  );
}

export default UserList;
