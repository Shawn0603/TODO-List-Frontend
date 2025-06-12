import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void; 
  isInTrash?: boolean;   
}

function TaskItem({ task, onToggle, onDelete, onRestore, isInTrash }: TaskItemProps) {
  return (
    <li className="task-item">
      <div
        className="task-indicator"
        style={{ backgroundColor: task.completed ? '#34D399' : '#3B82F6' }}
      ></div>

      <div className="task-content">
        <span onClick={() => alert(`Details:\n${task.text}`)}>
          {task.text}
        </span>

        {isInTrash ? (
          <button
            className="toggle-btn"
            onClick={() => onRestore?.(task.id)}
          >
            Restore
          </button>
        ) : (
          <button
            className="toggle-btn"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Activate' : 'Done'}
          </button>
        )}

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
