import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const json = await response.json();

        if (response.ok) {
          setPokemons(json.results);
        } else {
          setError(json.error || 'Algo deu errado...');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="row">
      {pokemons.map((pokemon) => (
        <div className="col-md-4 mb-4" key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>
            {pokemon.sprites && pokemon.sprites.front_default && (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="img-fluid"
                style={{ width: 200 }}
              />
            )}
            <h5 className="mt-2">{pokemon.name}</h5>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
