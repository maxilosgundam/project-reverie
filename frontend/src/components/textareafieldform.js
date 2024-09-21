const TextAreaField = ({ label, id, value, onChange }) => (
    <div>
      <label htmlFor={id} className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400">{label}</label>
      <textarea
        id={id}
        name={id}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
  
      />
    </div>
  );

  export default TextAreaField;