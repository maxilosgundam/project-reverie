import { useState } from 'react';

const ImageUploadField = ({ label, id, value, onChange }) => {
    const [preview, setPreview] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          onChange(file);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div>
        <label htmlFor={id} className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400">{label}</label>
        <input
          id={id}
          name={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
  
        />
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-w-full h-auto rounded" />
          </div>
        )}
      </div>
    );
  };
  
  export default ImageUploadField;