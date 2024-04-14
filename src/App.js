import React, { useState, useEffect, useRef } from 'react';
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const json = await response.json();

        if (response.ok) {
          setPokemon(json);
        } else {
          setError(json.error || 'Algo deu errado...');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPokemonName(inputRef.current.value.toLowerCase());
  };

  return (
    <div className="container">
      <header>
        <h1>Pokemons</h1>
      </header>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Digite o nome do Pokémon"
          ref={inputRef}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <div>Carregando...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {pokemon && pokemon.sprites && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '200px', height: '200px' }} />

          <table>
            <tbody>
              <tr>
                <td><strong>Peso:</strong></td>
                <td>{pokemon.weight}</td>
              </tr>
              <tr>
                <td><strong>Altura:</strong></td>
                <td>{pokemon.height}</td>
              </tr>
              <tr>
                <td><strong>Tipos:</strong></td>
                <td>{pokemon.types.map(type => type.type.name).join(', ')}</td>
              </tr>
              <tr>
                <td><strong>Habilidades:</strong></td>
                <td>{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
