import React from 'react';
import './card.css';
import Image from "./assets/pokemonBack.jpg"
export default function Card({ pokemon }) {
  if (!pokemon) {
    return null; 
  }

  const cardStyle = {
    backgroundImage: `url(${pokemon.background_image_url})`,
  };

  return (
    <div className="flip-container">
      <div className="flipper">
                      <div className="front">
                          <div className="containerCard">
                            <div className="pokemonCard" style={cardStyle}>
                              <div className="image">
                                <img src={pokemon.image_url} alt={pokemon.name} />
                              </div>
                              <div className="cardLow">
                              <div className="nome">
                                <p>{pokemon.name}</p>
                              </div>
                              <div className="tipo">{pokemon.category}</div>
                              <div className="botoes">
                                <button>Attack</button>
                                <button>Run Away</button>
                              </div>
                              </div>
                            </div>
                          </div>
                         </div>
                      <div className="back">
                            <img src={Image}/>
                        </div>
      </div>
    </div>
   
  );
}
