function TypeFilter({ types, selectedType, onChange }) {
  return (
    <select value={selectedType} onChange={(e) => onChange(e.target.value)}>
      <option value="all">All Types</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
