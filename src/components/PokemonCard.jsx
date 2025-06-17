import React, { useEffect } from "react";

const typeColors = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  bug: "bg-lime-500",
  poison: "bg-purple-500",
  flying: "bg-indigo-300",
  ground: "bg-yellow-600",
  rock: "bg-gray-500",
  psychic: "bg-pink-500",
  ghost: "bg-indigo-700",
  dragon: "bg-indigo-800",
  ice: "bg-blue-200",
  fairy: "bg-pink-300",
  normal: "bg-gray-300",
  fighting: "bg-orange-700",
  dark: "bg-gray-800",
  steel: "bg-gray-400",
};

function PokemonCard({ name, details, onLoad }) {
  useEffect(() => {
    if (!details) onLoad();
  }, [details]);
  
  if (!details)
    return (
      <div className="p-4 border rounded-lg shadow-md text-center text-gray-500">
        Loading {name}...
      </div>
    );

  const stats = {};
  details.stats.forEach((stat) => {
    stats[stat.stat.name] = stat.base_stat;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center w-full max-w-xs mx-auto">
      <div className="w-32 h-32 mx-auto mb-2 rounded-lg flex items-center justify-center">
        <img
          src={
            details.sprites.other["official-artwork"]?.front_default ||
            details.sprites.front_default
          }
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <p className="text-sm text-gray-500 mb-1">
        #{details.id.toString().padStart(3, "0")}
      </p>

      <h3 className="text-lg font-semibold capitalize text-gray-800">{name}</h3>

      <div className="flex justify-center gap-2 mt-1 mb-2">
        {details.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white capitalize ${
              typeColors[t.type.name] || "bg-gray-400"
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600">Height: {details.height / 10}m</p>
      <p className="text-sm text-gray-500">Weight: {details.weight / 10}kg</p>

      <div className="mt-3 text-center text-sm text-gray-700">
        <div className="flex gap-x-1 justify-center">
          <img className="size-5" src="/health.png" alt="Health icon" />
          <p>HP: {stats.hp}</p>
        </div>
        <div className="flex gap-x-1 justify-center">
          <img className="size-5" src="/attack.png" alt="Attack icon" />
          <p>Attack: {stats.attack}</p>
        </div>
        <div className="flex gap-x-1 justify-center">
          <img className="size-5" src="/defense.png" alt="Defense icon" />
          <p>Defense: {stats.defense}</p>
        </div>
        <div className="flex gap-x-1 justify-center">
          <img className="size-5" src="/speed.png" alt="Speed icon" />
          <p>Speed: {stats.speed}</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
