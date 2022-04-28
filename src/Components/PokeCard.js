import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { serialConverter } from "../Services/PokemonServices";

export default function PokeCard(pokemon){
// detail utama
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState([])

//  gambar
  let imageUrl = "";
  const [img, setImg] = useState();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

    useEffect(() => {
        fetch(pokemon.detail.url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
                imageUrl = result.sprites.other['official-artwork'].front_default;
                fetchImage();
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
      const { name,types,id } = item;
        // console.log(types && types[0]);
        // const types = item.types(tipe=>{
        //     return  <li className="pokemon-type bg bg--grass">tipe.type.name</li>
        // })
       return (
        <Link to={`/pokemon/${pokemon.detail.name}`}>
            <li className="grid-item">
              <div className={`pokemon-box bg-light bg-light--${types && types[0].type.name}`}>
                <img className="pokemon-box__img" src={img} alt="icons" width="90px" />
                <p className="pokemon-box__number">#{serialConverter(id)}</p>
                <h2 className="pokemon-box__name">{name}</h2>
                <div className="pokemon-box__types">
                      <ul className="pokemon-types">
                        {item.types && item.types.map((type)=>{
                           return (
                            <li className={`pokemon-type bg bg--${type.type.name}`} >
                              {type.type.name}
                            </li>
                          )
                        })}
                      </ul>
                </div>
              </div>
              </li>
            </Link>
        );
    }
}