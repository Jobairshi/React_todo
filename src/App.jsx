import React, { useState, useEffect } from 'react';
import Crud from './Components/Crud';

function App() {
  const [todos, setTodos] = useState(() => 
  {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [value, setValue] = useState('');

  const handleDeleteTodo = (i) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(i, 1);
    setTodos(updatedTodos);
  };

  const handleUpdateTodo = (index, updatedValue) => {
    if (updatedValue.trim() === '') {
      alert("Empty Can't be saved");
      return;
    }
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedValue;
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  
  const handleSubmit = (e) => {
    if (value === '') {
      alert("Empty Can't be inserted");
      return;
    }
    e.preventDefault();
    const newArr = [...todos, value];
    setTodos(newArr);
    setValue('');
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='min-h-screen bg-blue-100 flex flex-col items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-md w-96 text-center'>
        <h1 className='text-3xl text-blue-600 font-bold mb-4'>My Todo List</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center border rounded-lg'>
            <input
              type='text'
              className='w-72 py-2 px-4 rounded-l-lg border-r-0 focus:outline-none'
              placeholder='Enter your todo'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type='submit'
              className='px-4 py-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none'
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className='mt-4'>
        {todos.map((todo, i) => (
          <Crud key={i} index={i} value={todo} onDelete={() => handleDeleteTodo(i)} 
          onUpdate={(updatedValue) => handleUpdateTodo(i, updatedValue)}  />
        ))}
      </div>
    </div>
  );
}

export default App;
