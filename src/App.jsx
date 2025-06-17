import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TypeFilter from "./components/TypeFilter";
import PokemonCard from "./components/PokemonCard";
import {
  getPokemonList,
  getPokemonTypes,
  getPokemonDetails,
} from "./utils/pokeapi";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [list, typesData] = await Promise.all([
        getPokemonList(),
        getPokemonTypes(),
      ]);
      setPokemonList(list);
      setFilteredPokemon(list);
      setTypes(typesData);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) => {
      if (searchTerm && !pokemon.name.includes(searchTerm.toLowerCase()))
        return false;
      if (selectedType === "all") return true;
      const details = pokemonDetails[pokemon.name];
      return details && details.types.some((t) => t.type.name === selectedType);
    });
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList, pokemonDetails]);

  useEffect(() => {
    filteredPokemon.slice(0, 20).forEach((p) => {
      if (!pokemonDetails[p.name]) {
        getPokemonDetails(p.name).then((data) => {
          setPokemonDetails((prev) => ({ ...prev, [p.name]: data }));
        });
      }
    });
  }, [filteredPokemon]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-10 px-4">
      <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
        PokéFinder
      </h1>

      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredPokemon.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            details={pokemonDetails[p.name]}
            onLoad={() => {
              if (!pokemonDetails[p.name]) {
                getPokemonDetails(p.name).then((data) => {
                  setPokemonDetails((prev) => ({ ...prev, [p.name]: data }));
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;