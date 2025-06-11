import { useState, useEffect } from 'react';
import './App.css';
import type { Task } from './types/task';
import AddTask from './components/AddTask';
import TaskItem from './components/TaskItem';



function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newItem: Task = {
      id: Date.now(),
      text,
      completed: false,
      deleted: false
    };
    setTasks([newItem, ...tasks]);
  };



  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });




  return (
    <div className="app-container">
  
      <div className="sticky-header">
        <div className="header">
          <h1>To-Do List</h1>
          <span className="date">{today}</span>
        </div>
  
        <AddTask onAddTask={addTask} />
  
        
      </div>

      <div className="feature-bar">
         <button className="feature-button">🚩 Priority</button>
         
         <button className="feature-button">⭐ Starred</button>
         
         <button className="feature-button">⏰ Reminders</button>
         <button className="feature-button">🗑️ Trash</button>
      </div>

  
      
      <div className="task-columns">
        <div className="task-column">
          <h2> Active Tasks</h2>
          {tasks
            .filter(task => !task.completed && !task.deleted)
            .map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
        </div>
  
        <div className="task-column">
          <h2> Completed Tasks</h2>
          {tasks
            .filter(task => task.completed && !task.deleted)
            .map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
        </div>
      </div>
  
    </div>  
  );
  
}

export default App;
