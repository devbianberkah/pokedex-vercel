import React from "react";

export default function PokeCard(pokemon){
    console.log(pokemon)
    return (
            <li className="grid-item">
                <a href="">

                    {/* <PokeDetail {item=item} /> */}
                </a>
                <div className="pokemon-box bg-light bg-light--grass">
                    <img className="pokemon-box__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"/>
                    <p className="pokemon-box__number">#001</p>
                    <h2 className="pokemon-box__name">{pokemon.detail.name}</h2>
                </div>
            </li>
    )
}