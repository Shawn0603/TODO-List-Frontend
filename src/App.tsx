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

  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
  });
  


  return (
    <div className="app-container">
      <h1>To-Do List</h1>
  
      <AddTask onAddTask={addTask} />

      <div className="filter-buttons">
  <button
    onClick={() => setFilter('all')}
    className={filter === 'all' ? 'active' : ''}
  >
    All
  </button>
  <button
    onClick={() => setFilter('active')}
    className={filter === 'active' ? 'active' : ''}
  >
    Active
  </button>
  <button
    onClick={() => setFilter('completed')}
    className={filter === 'completed' ? 'active' : ''}
  >
    Completed
  </button>
</div>

  
      <ul className="task-list">
        {filteredTasks.map(task => (

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
