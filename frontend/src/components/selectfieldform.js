const SelectField = ({ label, id, value, onChange, options }) => (
    <div>
      <label htmlFor={id} className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
  
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  export default SelectField;