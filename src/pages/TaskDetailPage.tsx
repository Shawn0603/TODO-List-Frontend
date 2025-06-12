import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Task } from '../types/task';
import './TaskDetailPage.css';

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || 'main';

  // Local states
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Load task from localStorage on mount and focus
  useEffect(() => {
    const updateFromStorage = () => {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        const parsed: Task[] = JSON.parse(stored);
        const found = parsed.find(t => t.id.toString() === id);
        if (found) {
          setTask(found);
          setTitle(found.text);
          setNotes(found.notes || '');
          setImportant(found.important || false);
          setCompleted(found.completed || false); // ✅ Preserve completion status
        }
      }
    };

    updateFromStorage();
    window.addEventListener('focus', updateFromStorage);
    return () => {
      window.removeEventListener('focus', updateFromStorage);
    };
  }, [id]);

  // Toggle importance
  const toggleImportant = () => {
    const newImportant = !important;
    setImportant(newImportant);

    const stored = localStorage.getItem('tasks');
    if (!stored) return;
    const parsed: Task[] = JSON.parse(stored);
    const updatedTasks = parsed.map(t =>
      t.id.toString() === id ? { ...t, important: newImportant, completed } : t
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Save notes and importance
  const handleEditOrSave = () => {
    if (isEditing) {
      const stored = localStorage.getItem('tasks');
      if (!stored) return;
      const parsed: Task[] = JSON.parse(stored);
      const updatedTasks = parsed.map(t =>
        t.id.toString() === id ? { ...t, notes, important, completed } : t
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setIsEditing(prev => !prev);
  };

  // Save title
  const handleEditOrSaveTitle = () => {
    if (isEditingTitle) {
      const stored = localStorage.getItem('tasks');
      if (!stored) return;
      const parsed: Task[] = JSON.parse(stored);
      const updatedTasks = parsed.map(t =>
        t.id.toString() === id ? { ...t, text: title, completed } : t
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setIsEditingTitle(prev => !prev);
  };

  // If task not found
  if (!task) {
    return (
      <div style={{ padding: '24px' }}>
        <p>Task not found.</p>
        <button
          onClick={() => navigate(from === 'trash' ? '/?view=trash' : '/')}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="task-detail-container">
      <div className="task-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
        ) : (
          <h2>{title}</h2>
        )}
        <button className="edit-title-btn" onClick={handleEditOrSaveTitle}>
          {isEditingTitle ? 'Save' : 'Edit Title'}
        </button>
        <span className="created-time">
          Created at:{' '}
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString()
            : 'Unknown'}
        </span>
      </div>

      <div className="task-actions">
        <button
          className={`action-btn ${important ? 'important' : ''}`}
          onClick={toggleImportant}
        >
          🚩
        </button>
        <button className="action-btn" disabled title="Not implemented">
          ⭐
        </button>
        <button className="action-btn" disabled title="Not implemented">
          ⏰
        </button>
      </div>

      <div className="task-note">
        <textarea
          placeholder="some note..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          readOnly={!isEditing}
        />
      </div>

      <div className="task-footer-buttons">
        <button className="action-btn" onClick={handleEditOrSave}>
          {isEditing ? '💾 Save' : '✏️ Edit'}
        </button>
        <button
          className="action-btn"
          onClick={() => navigate(from === 'trash' ? '/?view=trash' : '/')}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}

export default TaskDetailPage;
