import React from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { getPokeDetailData } from "../Services/PokemonServices";
import { serialConverter } from "../Helper/StringHelper";

export default function PokeDetail(){
    const location = useLocation();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon,setPokeDetailData] = useState([]);
    
//  gambar
    let imageUrl = "";
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };
    useEffect(()=>{
        getPokeDetailData(location.pathname)
                        .then((result)=>{
                            setIsLoaded(true);
                            setPokeDetailData(result);
                            imageUrl = result.sprites.other['official-artwork'].front_default;
                            fetchImage();
                        },
                        (error) => {
                            setIsLoaded(true)
                            setError(true)
                        }
                    );
    },[location.pathname]);

   // console.log(types);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const { id,types, name, height, weight, base_experience } = pokemon;
        return (
            // <li className="grid-item">
            
            //   </li>
            <div className="page-detail bg-light bg-light--grass">
               <div className={`pokemon-box bg-light bg-light--${types && types[0].type.name}`}>
                 <img className="pokemon-box__img" src={img} alt="icons" />
                 <p className="pokemon-box__number">#{serialConverter(id)}</p>
                 <h2 className="pokemon-box__name">{name}</h2>
                 <div className="pokemon-box__types">
                      <ul className="pokemon-types">
                        {pokemon.types && pokemon.types.map((type)=>{
                           return (
                            <li className={`pokemon-type bg bg--${type.type.name}`} >
                              {type.type.name}
                            </li>
                          )
                        })}
                      </ul>
                      <ul>
                          {pokemon.stats && pokemon.stats.map((stat)=>{
                              return (
                                  <li>
                                      {stat.stat.name} : {stat.base_stat}
                                  </li>
                              )
                          })}
                          <li>Height = {height}</li>
                          <li>Weight = {weight}</li>
                          
                      </ul>
                </div>
              </div>
         </div>
        );
    }
}