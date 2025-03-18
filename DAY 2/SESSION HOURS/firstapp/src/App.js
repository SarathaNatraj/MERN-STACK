import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Headline from './helloworld';
import UserList from './userlist';

function App() {

  const[task,setTask] = useState('');
  const [tasks, setTasks] = useState([]); // State to hold tasks

  function addTask(){
    console.log(" inside add Task");
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(''); // Clear input after adding task
    }

  }


  return (
    <div className="App">
      <p> Todo List  React App</p>
      <br/>
      {/* <Headline title="Apple demo on AI"/>
      <Headline title="Microsoft trial run ML"/>
      <Headline title="Apple demo on AI"/>
      <Headline title="Microsoft trial run ML"/>
       */}
       <UserList/>
     
      <div>
        <form>
        <input
          type="text" 
          value="{task}" 
          placeholder="Enter a new task"
        />
            <button onClick={addTask}>Add Task</button>
    
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <span>{task.text}</span>
            <button >Delete</button>
          </li>
        ))}
      </ul>
   
      </div>
    </div>
  );
}

export default App;
