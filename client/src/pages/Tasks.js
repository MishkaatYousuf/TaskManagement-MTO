import { useEffect, useState } from 'react';
import api from '../services/api';
import './Tasks.css';
import { useNavigate } from 'react-router-dom';


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;


  const filteredTasks = tasks.filter(task => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    filterStatus === 'All' || task.status === filterStatus;

  return matchesSearch && matchesStatus;
});
const indexOfLastTask = currentPage * tasksPerPage;
const indexOfFirstTask = indexOfLastTask - tasksPerPage;

const paginatedTasks = filteredTasks.slice(
  indexOfFirstTask,
  indexOfLastTask
);

const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

useEffect(() => {
  setCurrentPage(1);
}, [search, filterStatus]);

  const logout = () => {
  localStorage.removeItem('token');
  navigate('/');
};

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

    const createTask = async () => {
    if (!title || !description) {
        alert('Title and description are required');
        return;
    }

    if (title.length > 60) {
        alert('Task title cannot exceed 60 characters');
        return;
    }

    await api.post('/tasks', { title, description, status });
    setTitle('');
    setDescription('');
    setStatus('Pending');
    fetchTasks();
    };
  

  const updateStatus = async (id, newStatus) => {
    await api.put(`/tasks/${id}`, { status: newStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

return (
  <div className="tasks-container">
    <div className="tasks-wrapper">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h2>My Tasks</h2>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#05415e',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div className="task-form">
        <input
            value={title}
            placeholder="Task title (max 60 characters)"
            maxLength={60}
            onChange={e => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Task description"
          onChange={e => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button onClick={createTask}>Create Task</button>
      </div>

        <div className="task-filters">
        <input
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
        />

        <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        </div>

      <div className="task-list">
        {paginatedTasks.map(task => (
          <div
            key={task._id}
            className={`task-card ${
              task.status === 'In Progress'
                ? 'in-progress'
                : task.status === 'Completed'
                ? 'completed'
                : ''
            }`}
          >
            <h4>{task.title}</h4>
            <div className="task-meta">
              {task.status} •{' '}
              {new Date(task.createdAt).toLocaleDateString()}
            </div>

            <p>{task.description}</p>

            <div className="task-actions">
              <button
                onClick={() =>
                  updateStatus(
                    task._id,
                    task.status === 'Pending'
                      ? 'In Progress'
                      : task.status === 'In Progress'
                      ? 'Completed'
                      : 'Pending'
                  )
                }
              >
                Update Status
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
  <div className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
    >
      Prev
    </button>

    <span style={{ padding: '6px 10px' }}>
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
    >
      Next
    </button>
  </div>
)}

    </div>
  </div>
);
}
