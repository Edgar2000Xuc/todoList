import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './componentes/TodoList';

import './App.css'; // Asegúrate de importar tu archivo CSS

export function App2() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: 'Tarea 1',
      completed: false,
      priority: 1, // Prioridad de ejemplo, puedes ajustarla
    },
    // Otras tareas...
  ]);

  const [selectedTodos, setSelectedTodos] = useState([]);
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [showNoPriority, setShowNoPriority] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const todoTaskRef = useRef();
  const todoPriorityRef = useRef(); // Referencia al campo de prioridad

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
    const priority = parseInt(todoPriorityRef.current.value); // Obtener la prioridad del campo
    const newTodo = {
      id: todos.length + 1,
      task: task,
      completed: false,
      priority: priority, // Usar la prioridad ingresada por el usuario
    };
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
    todoTaskRef.current.value = ''; // Limpiar el campo de tarea después de agregar
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
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
        <label>
          Prioridad:
          <select ref={todoPriorityRef}>
            <option value="1">Alta</option>
            <option value="2">Media</option>
            <option value="3">Baja</option>
          </select>
        </label>
        <button onClick={handleTodoAdd}>Agregar Tarea</button>
        <button onClick={handleClearAll}>Borrar Tareas Completadas</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showHighPriority}
            onChange={() => setShowHighPriority(!showHighPriority)}
          />
          Mostrar tareas de mayor prioridad
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showNoPriority}
            onChange={() => setShowNoPriority(!showNoPriority)}
          />
          Mostrar tareas sin prioridad
        </label>
      </div>
      <div>
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
