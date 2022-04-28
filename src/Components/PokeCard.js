import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function PokeCard(pokemon){
// detail utama
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState()

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
        // console.log(item);
        // const types = item.types(tipe=>{
        //     return  <li className="pokemon-type bg bg--grass">tipe.type.name</li>
        // })
       return (
            <li className="grid-item">
            <a href="">
            </a>
            <div className="pokemon-box bg-light bg-light--grass">
              <img className="pokemon-box__img" src={img} alt="icons" width="90px" />
              <p className="pokemon-box__number">001</p>
               <h2 className="pokemon-box__name">{pokemon.detail.name}</h2>
               <div className="pokemon-box__types">
                    <ul className="pokemon-types">
                       {/* {types} */}
                    </ul>
               </div>
            </div>
            </li>
        );
    }
}