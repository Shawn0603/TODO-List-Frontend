// src/pages/TaskDetailPage.tsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Task } from '../types/task';

function TaskDetailPage() {
  const { id } = useParams(); // 从 URL 获取 task id
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const parsed: Task[] = JSON.parse(stored);
      const found = parsed.find(t => t.id.toString() === id);
      setTask(found || null);
    }
  }, [id]);

  if (!task) return <div style={{ padding: '24px' }}>Task not found.</div>;

  return (
    <div style={{ padding: '24px' }}>
      <h2>Task Details</h2>
      <p><strong>Text:</strong> {task.text}</p>
      <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Active'}</p>
      <p><strong>Deleted:</strong> {task.deleted ? 'Yes' : 'No'}</p>
      <p><strong>Created:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</p>
    </div>
  );
}

export default TaskDetailPage;
