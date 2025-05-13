'use client'
import React, { Fragment } from 'react'
import { Pokemon, PokemonType, Evolution } from '../pokemonList/page'
import { Dialog, Transition } from '@headlessui/react'

interface PokemonModalProps {
  pokemon: Pokemon
  isOpen: boolean
  onClose: () => void
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!pokemon) return null;
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          {/* Overlay */}
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-50"
            leave="ease-in duration-200"
            leaveFrom="opacity-50"
            leaveTo="opacity-0"
          >
          </Transition>

          {/* Trick centering */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">​</span>

          {/* Modal panel */}
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {pokemon.name} <span className="text-xl text-gray-500">#{pokemon.pokedexId}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pokemon.types.map((type: PokemonType) => (
                      <span
                        key={type.id}
                        className="flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: type.name }}
                      >
                        <img
                          src={type.image}
                          alt={type.name}
                          className="w-5 h-5 mr-2"
                        />
                        {type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <section className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(pokemon.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Evolutions */}
              <section className="mt-6">
                <h3 className="text-2xl font-semibold mb-4">Évolutions</h3>
                {pokemon.evolutions.length > 0 ? (
                  <div className="flex flex-wrap gap-6">
                    {pokemon.evolutions.map((evo: Evolution) => (
                      <div key={evo.pokedexId} className="flex flex-col items-center">
                        <span className="text-lg font-medium text-gray-800">{evo.name}</span>
                        <span className="text-gray-500">#{evo.pokedexId}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Aucune évolution supplémentaire</p>
                )}
              </section>
            </div>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  )
}
export default PokemonModal;