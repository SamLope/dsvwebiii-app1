import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatWeight, formatHeight } from './utils';

function PokemonDetails() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
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
  }, [pokemonId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  if (!pokemon) {
    return <div>Pokémon não encontrado</div>;
  }

  return (
    <div className="card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <p className="card-text">
          <strong>Nº:</strong> {pokemon.id}
        </p>
        <p className="card-text">
          <strong>Peso:</strong> {formatWeight(pokemon.weight)}
        </p>
        <p className="card-text">
          <strong>Altura:</strong> {formatHeight(pokemon.height)}
        </p>
        <p className="card-text">
          <strong>Tipo:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}
        </p>
        <p className="card-text">
          <strong>Habilidades:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
}

export default PokemonDetails;
