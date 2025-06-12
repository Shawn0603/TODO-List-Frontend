import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="task-item">
      <div
        className="task-indicator"
        style={{ backgroundColor: task.completed ? '#34D399' : '#3B82F6' }} // green or blue
      ></div>

      <div className="task-content">
        
        <span onClick={() => alert(`Details:\n${task.text}`)}>
          {task.text}
        </span>

        
        <button
          className="toggle-btn"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Activate' : 'Done'}
        </button>

        
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
