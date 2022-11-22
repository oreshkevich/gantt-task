import { useState, useEffect } from 'react';
import Tasks from './Tasks';
import { getAllNotes } from '../Services/NoteService';

export default function GanttChart() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const notes = await getAllNotes();
    setTasks(notes);
  }
  return (
    <div className="container">
      {tasks.length ? (
        <Tasks tasks={tasks} />
      ) : (
        <div>
          <h2 className="gantt-title">Nothing found</h2>
        </div>
      )}
    </div>
  );
}
