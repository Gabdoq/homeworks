import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTareas } from '../hooks/useTareas';
import './PaginaTareas.css';

export const TasksPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { tareas, agregarTarea, eliminarTarea, editarTarea, toggleTarea } = useTareas();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');

  const handleAgregarTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim() && descripcion.trim()) {
      agregarTarea(titulo, descripcion);
      setTitulo('');
      setDescripcion('');
    }
  };

  const handleEditarTarea = (id: string) => {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      setEditingId(id);
      setEditTitulo(tarea.titulo);
      setEditDescripcion(tarea.descripcion);
    }
  };

  const handleGuardarEdicion = (id: string) => {
    if (editTitulo.trim() && editDescripcion.trim()) {
      editarTarea(id, editTitulo, editDescripcion);
      setEditingId(null);
      setEditTitulo('');
      setEditDescripcion('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>Gestor de Tareas</h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </header>

      <main className="tasks-main">
        <section className="add-task-section">
          <h2>Nueva Tarea</h2>
          <form onSubmit={handleAgregarTarea} className="task-form">
            <div className="form-group">
              <label htmlFor="titulo">Título:</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título de la tarea"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la tarea"
                required
              ></textarea>
            </div>
            <button type="submit" className="add-btn">Agregar Tarea</button>
          </form>
        </section>

        <section className="tasks-list-section">
          <h2>Mis Tareas ({tareas.length})</h2>
          {tareas.length === 0 ? (
            <p className="no-tasks">No tienes tareas. ¡Crea una nueva!</p>
          ) : (
            <div className="tasks-list">
              {tareas.map((tarea) => (
                <div key={tarea.id} className={`task-item ${tarea.completada ? 'completed' : ''}`}>
                  {editingId === tarea.id ? (
                    <div className="task-edit">
                      <input
                        type="text"
                        value={editTitulo}
                        onChange={(e) => setEditTitulo(e.target.value)}
                        className="edit-input"
                      />
                      <textarea
                        value={editDescripcion}
                        onChange={(e) => setEditDescripcion(e.target.value)}
                        className="edit-textarea"
                      ></textarea>
                      <div className="task-actions">
                        <button onClick={() => handleGuardarEdicion(tarea.id)} className="save-btn">
                          Guardar
                        </button>
                        <button onClick={() => setEditingId(null)} className="cancel-btn">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={tarea.completada}
                          onChange={() => toggleTarea(tarea.id)}
                          className="task-checkbox"
                        />
                        <div className="task-text">
                          <h3>{tarea.titulo}</h3>
                          <p>{tarea.descripcion}</p>
                          <small>{new Date(tarea.fechaCreacion).toLocaleDateString()}</small>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button onClick={() => handleEditarTarea(tarea.id)} className="edit-btn">
                          Editar
                        </button>
                        <button onClick={() => eliminarTarea(tarea.id)} className="delete-btn">
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
