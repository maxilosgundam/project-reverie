import { useState } from 'react';

const MultiInputField = ({ label, id, values = [], onChange }) => {
    const [inputValue, setInputValue] = useState('');
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        e.preventDefault();
        onChange([...values, inputValue.trim()]);
        setInputValue('');
      }
    };
  
    const removeValue = (index) => {
      onChange(values.filter((_, i) => i !== index));
    };
  
    return (
      <div>
        <label htmlFor={id} className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400">{label}</label>
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Type and press Enter to add"
        />
        <div className="flex flex-wrap gap-2">
          {Array.isArray(values) && values.map((value, index) => (
            <div key={index} className="bg-amber-100 px-2 py-1 rounded flex items-center">
            <span className="mr-2">{value}</span>
            <button
              type="button"
              onClick={() => removeValue(index)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
          ))}
        </div>
      </div>
    );
  };

  export default MultiInputField;