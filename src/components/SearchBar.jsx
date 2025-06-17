function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
    />
  );
}

export default SearchBar;
