'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PokemonModal from '../pokemonModal/page';

export interface Stats {
  HP: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  // champs en snake_case s’ils sont aussi retournés
  special_attack: number;
  special_defense: number;
}

export interface Evolution {
  name: string;
  pokedexId: number;
}

export interface PokemonType {
  id: number;
  name: string;
  image: string;
}

export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: Stats;
  generation: number;
  evolutions: Evolution[];
  types: PokemonType[];
}

interface PokemonListProps {
  searchTerm: string;
}
const PokemonList: React.FC<PokemonListProps> = ({ searchTerm }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const filteredPokemons = pokemons.filter(pokemon => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      pokemon.name.toLowerCase().includes(term) ||
      pokemon.types.some(type => type.name.toLowerCase().includes(term))
    );
  });
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)


  useEffect(() => {
    const fetchPokemons = async () => {
      if (offset === 1) setLoading(true);
      else setLoadingMore(true);
      try {
        console.log('Fetching pokemons with offset:', offset);
        const res = await fetch(
          `https://nestjs-pokedex-api.vercel.app/pokemons?limit=50&page=${offset}`
        );
        const data: Pokemon[] = await res.json();
        setPokemons(prev =>
          offset === 1 ? data : [...prev, ...data]
        );
        setHasMore(data.length === 50);
      } catch (error) {
        console.error(error);
      } finally {
        if (offset === 1) setLoading(false);
        else setLoadingMore(false);
      }
    };
    fetchPokemons();
  }, [offset]);

  const lastPokemonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-4">
      {loading ? (
        <div style={{ fontSize: '24px', color: '#555' }}>
          Loading...
        </div>
      ) : (
        filteredPokemons.map((pokemon, idx) => (
          <div
            ref={idx === filteredPokemons.length - 1 ? lastPokemonRef : null}
            key={idx}
            className="border border-gray-300 rounded-lg p-4 w-50 shadow-sm bg-white"
            onClick={() => setSelectedPokemon(pokemon)}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full rounded-lg object-cover h-40"
            />
            <h2 className="text-xl font-bold mt-2 mb-1 text-gray-800">
              {pokemon.name}
            </h2>
            <p className="text-base text-gray-600 mb-2">
              #{pokemon.pokedexId}
            </p>
            <div className="flex flex-wrap gap-1">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="flex items-center px-2 py-1 rounded-full text-sm font-medium text-black"
                  style={{ backgroundColor: type.name }}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-4 h-4 mr-1"
                  />
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
      {loadingMore && (
        <div className="col-span-full text-center p-4 text-gray-500">
          Loading more...
        </div>
      )}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={true}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default PokemonList;
