import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PokeImageRenderer from "./PokeImageRenderer";

export default function PokeCard(pokemon){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState()

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
       return (
            <li className="grid-item">
            <a href="">
            </a>
            <div className="pokemon-box bg-light bg-light--grass">
               {/* <img className="pokemon-box__img" src="" /> */}
                   {/* {typeof item.sprites !== 'undefined' ? <div>ada</div> : <div>Tidak ada</div>} */}
                        {/* <img className="pokemon-box__img" src={item.sprites.other['official-artwork'].front_default}/> */}
                        <img className="pokemon-box__img" src={img} alt="icons" width="90px" />
                     <p className="pokemon-box__number">001</p>
                <h2 className="pokemon-box__name">{pokemon.detail.name}</h2>
            </div>
            </li>
        );
    }
}