const URL = "https://pokeapi.co/api/v2";

export async function getPokemonList() {
  const res = await fetch(`${URL}/pokemon?limit=151`);
  const data = await res.json();
  return data.results;
}

export async function getPokemonTypes() {
  const res = await fetch(`${URL}/type`);
  const data = await res.json();
  return data.results.filter((t) => !["unknown", "shadow", "stellar", "dark"].includes(t.name));
}

export async function getPokemonDetails(name) {
  const res = await fetch(`${URL}/pokemon/${name}`);
  const data = await res.json();
  return data;
}
