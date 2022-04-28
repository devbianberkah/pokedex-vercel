import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { serialConverter } from "../Helper/StringHelper";

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
                <ul className="pokemon-home-box-content">
                  <li className="pokemon-home-box__img-container">
                     <img className="pokemon-home-box__img" src={img} alt="icons" />
                  </li>
                  <li className="pokemon-home-box__detail-container">
                    <ul className="pokemon-home-box-content">
                      <li>
                        <h1 className="pokemon-box__name">{name}</h1>
                     </li>
                      <li className="">
                        <p className="pokemon-box-home__number">#{serialConverter(id)}</p>
                      </li>
                    </ul>
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
                  </li>
                </ul>
              </div>
              </li>
            </Link>
        );
    }
}