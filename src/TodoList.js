import React, { useEffect, useRef, useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [{ id: Date.now(), text: '', completed: false }];
  });
  const [focusedId, setFocusedId] = useState(null);
  const inputRefs = useRef({});


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (focusedId && inputRefs.current[focusedId]) {
      inputRefs.current[focusedId].focus();
    }
  }, [focusedId]);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const handleTextChange = (id, text) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const handleKeyDown = (e, id, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: '', completed: false };
      const newTodos = [...todos];
      newTodos.splice(index + 1, 0, newTodo);
      setTodos(newTodos);
      setTimeout(() => setFocusedId(newTodo.id), 0);
    } else if (e.key === 'Backspace' && todos[index].text === '' && todos.length > 1) {
      e.preventDefault();
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      if (index > 0) {
        setFocusedId(todos[index - 1].id);
      }
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    if (todos.length === 1) {
      setTodos([{ id: Date.now(), text: '', completed: false }]);
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const resetAll = () => {
    setTodos([{ id: Date.now(), text: '', completed: false }]);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <div className="date">{formattedDate}</div>
      </div>
      
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="todo-checkbox"
            />
            <input
                ref={(el) => inputRefs.current[todo.id] = el}
                type="text"
                value={todo.text}
                onChange={(e) => handleTextChange(todo.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo.id, index)}
                className={`todo-input ${todo.completed ? 'completed' : ''}`}
                placeholder="할 일을 입력하세요"
                />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
              title="삭제"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <button onClick={resetAll} className="reset-btn">
        전체 초기화
      </button>
    </div>
  );
}

export default TodoList;