import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './componentes/TodoList';

import './App.css'; // Asegúrate de importar tu archivo CSS

export function App2() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: 'Tarea 1',
      completed: false,
      priority: 1,
    },
    // Otras tareas...
  ]);

  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [showNoPriority, setShowNoPriority] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todoApp.todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoApp.todos', JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);

    const isSelected = selectedTodos.includes(todo);

    if (!isSelected) {
      setSelectedTodos([...selectedTodos, todo]);
    } else {
      setSelectedTodos(selectedTodos.filter((selectedTodo) => selectedTodo.id !== id));
    }
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === '') return;
    const newTodo = {
      id: todos.length + 1,
      task: task,
      completed: false,
      priority: 5, // Por defecto, la prioridad es 5
    };
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);

    setSelectedTodos([]);
  };

  // Filtra las tareas según las categorías seleccionadas
  const filteredTodos = todos.filter((todo) => {
    if (
      (showHighPriority && todo.priority === 1) ||
      (showNoPriority && todo.priority === 5) ||
      (showPending && !todo.completed)
    ) {
      return true;
    }
    return false;
  });

  return (
    <Fragment>
      <div>
        <button onClick={() => setShowHighPriority(!showHighPriority || selectedTodos.length > 0)}>
          Mayor Prioridad
        </button>
        <button onClick={() => setShowNoPriority(!showNoPriority)}>Sin Prioridad</button>
        <button onClick={() => setShowPending(!showPending)}>Pendientes</button>
      </div>
      <div className="filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={showHighPriority}
            onChange={() => setShowHighPriority(!showHighPriority || selectedTodos.length > 0)}
          />
          Mostrar tareas de mayor prioridad
        </label>
      </div>
      <div className="filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={showNoPriority}
            onChange={() => setShowNoPriority(!showNoPriority)}
          />
          Mostrar tareas sin prioridad
        </label>
      </div>
      <div className="filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={showPending}
            onChange={() => setShowPending(!showPending)}
          />
          Mostrar tareas pendientes
        </label>
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</div>
      <div>
        {selectedTodos.length > 0 && (
          <p>
            Tareas seleccionadas: {selectedTodos.map((todo) => `${todo.task} (prioridad ${todo.priority})`).join(', ')}
          </p>
        )}
      </div>
    </Fragment>
  );
}
