import { useState } from 'react';
import './App.css';
import type { Task } from './types/task';
import AddTask from './components/AddTask';
import TaskItem from './components/TaskItem';



function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newItem: Task = {
      id: Date.now(),
      text,
      completed: false,
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

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
  
      <AddTask onAddTask={addTask} />
  
      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
  
}

export default App;
