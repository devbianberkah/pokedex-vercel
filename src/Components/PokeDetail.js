import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { getPokeDetailData } from "../Services/PokemonServices";
import { serialConverter } from "../Helper/StringHelper";
import Progress_bar from "../Helper/ProgressBar";
import {Offline,Online,Detector} from "react-detect-offline"
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
            <div>
            <Online>
            <div className="page-detail">
                 <div className={`pokemon-box bg-light bg-light--${types && types[0].type.name}`}>
                    <ul className="pokemon-home-box-content">
                    <li className="pokemon-home-box__detail-container">
                        <Link to="/" >
                            <button className="button  button-white" >{"<"} Back</button>
                        </Link>
                        <ul className="pokemon-home-box-content">
                        <li>
                            <h1 className="pokemon-box__name">{name}</h1>
                        </li>
                        <li className="">
                            <p className="pokemon-detail-box__number">#{serialConverter(id)}</p>
                        </li>
                        </ul>
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
                        </div>
                    </li>
                    </ul>
                    <img className="pokemon-detail-box__img" src={img} />
                    <ul className="grid">
                        <li className="grid-item">
                            <div className="page-detail__panel">
                                <div className="panel">
                                    <ul className="grid">
                                        <li className="grid-item">
                                        <h1 className="stats-title">Size</h1>
                                            <ul className="stats-compare__bars">
                                                <li className="">
                                                    <p className="size-item-label">Height</p>
                                                    <p>{height/10} m</p>
                                                </li>
                                                <li >
                                                    <p className="size-item-label">Weight</p>
                                                    <p>{weight/10} kg</p>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="grid-item">
                                            <h1 className="stats-title">Base Stats</h1>
                                            <ul className="base-stats-compare__bars">
                                                {pokemon.stats && pokemon.stats.map((stat)=>{
                                                    return (
                                                        <li className="grid-item">
                                                            <ul className="stats-compare__bars">
                                                                <li>
                                                                    {stat.stat.name}
                                                                </li>
                                                                <li className="">
                                                                    {stat.base_stat}
                                                                </li>
                                                                <li className="">
                                                                <Progress_bar bgcolor="rgb(80 179 249)" height={10} progress={(stat.base_stat/252)*100} />
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    )
                                                    })}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
              </div>
         </div>
         </Online>
         <Offline>
              <div className="offline-stats">
                            Koneksi Offline
                        </div>
         </Offline>
         </div>
        );
    }
}