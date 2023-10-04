import React, { useState } from 'react';

export default function Crud(props) {
  const { value, onDelete, onUpdate } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const trimmedValue = editedValue.trim();
    
    if (trimmedValue === '') {
      alert("Empty Can't be saved");
      return;
    }
    onUpdate(trimmedValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedValue(value);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const textStyle = isChecked ? 'line-through' : '';

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-10'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='form-checkbox text-pink-400 h-5 w-5'
        />
        {isEditing ? (
          <input
            type='text'
            value={editedValue}
            onChange={handleInputChange}
            className='text-xl'
          />
        ) : (
          <p className={`text-xl ${textStyle}`}>{value}</p>
        )}
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className='bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200'
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200'
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className='bg-yellow-500 text-black py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200'
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className='bg-blue-700 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200'
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
