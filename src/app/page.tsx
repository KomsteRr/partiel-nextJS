'use client'
import { useState } from "react";
import PokemonList from './components/pokemonList/page';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Pokémon */}
      <header className="w-full flex items-center justify-between px-4 py-4 bg-red-600 shadow-md gap-4 flex-col sm:flex-row">
        <div className="flex-1 flex items-center justify-start">
          <span
            className="text-3xl font-bold text-yellow-400 drop-shadow-[2px_2px_0px_#3466af] font-pokemon"
            style={{ fontFamily: 'Press Start 2P, cursive' }}
          >
            Pokemon
          </span>
        </div>
        <div className="flex-1 flex justify-center w-full max-w-md">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base shadow-sm"
          />
        </div>
        <div className="flex-1" />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <PokemonList searchTerm={searchTerm} />
      </main>
    </div>
  );
}
