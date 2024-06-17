import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css';
import Image from "./assets/pokemonSearch.png";
import Card from './card';

export default function Search() {
  const [name, setName] = useState(''); 
  const [pokemonListFixa, setPokemonListFixa] = useState([]); 
  const [pokemonListDinamica, setPokemonListDinamica] = useState(null); 
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchFixedPokemonList = async () => {
      try {
        const { data } = await axios.get(`https://dev-api-teste.mandarin.com.br/pokemons`);
        setPokemonListFixa(data); 
        setError('');
        if (data.length > 0) {
          setCurrentPokemonIndex(0);
        }
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err);
        setError('Erro ao buscar dados da API');
      }
    };

    fetchFixedPokemonList();
  }, []); 
  const nextPokemon = () => {
    if (pokemonListDinamica) {
      setCurrentPokemonIndex((prevIndex) => (prevIndex + 1) % pokemonListFixa.length);
    } else if (pokemonListFixa.length > 0) {
      setCurrentPokemonIndex((prevIndex) => (prevIndex + 1) % pokemonListFixa.length);
    }
    setPokemonListDinamica(null); 

  };

  const searchPokemon = async () => {
    try {
      const { data } = await axios.get(`https://dev-api-teste.mandarin.com.br/pokemons?name=${name}`);
      if (data.length > 0) {
        setPokemonListDinamica(data);
        setError('');
      } else {
        setPokemonListDinamica(null); 
        setError('Pokémon não encontrado');
      }
    } catch (err) {
      console.error('Erro ao buscar dados da API:', err);
      setError('Erro ao buscar dados da API');
      setPokemonListDinamica(null); 
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchPokemon();
    }
  };
  return (
    <>

     <div className="gerarOutro">
      <button id="gerar" onClick={nextPokemon} disabled={!pokemonListDinamica && pokemonListFixa.length === 0}>
        Gerar outro Pokémon
      </button>
      </div>
      {error && <p>{error}</p>}
      {pokemonListDinamica ? (
        <Card pokemon={pokemonListDinamica[0]} />
      ) : pokemonListFixa.length  ? (
        <Card pokemon={pokemonListFixa[currentPokemonIndex]} />
      ) : (
        <p>Carregando...</p>
      )}
  
      <div id="searchField">
        <input
          id="searchBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={searchPokemon}>
          <img src={Image} alt="Search" id="imageSearch" />
        </button>
      </div>
      </>
  );
}
