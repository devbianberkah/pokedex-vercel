import React from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { getPokeDetailData } from "../Services/PokemonServices";

export default function PokeDetail(){
    const location = useLocation();

    const [pokemon,setPokeDetailData] = useState([]);
    
    useEffect(()=>{
        getPokeDetailData(location.pathname)
                    .then((data)=>{
                        setPokeDetailData(data);
                    });
    },[location.pathname]);

    const { id,types, name, height, weight, base_experience } = pokemon;
    // console.log(types);
    return (
        <div className="page-detail bg-light bg-light--grass">
            <div className="page-detail__title">
                <h1>{name}</h1>
            </div>
            <div className="page-detail__types">
                <ul className="pokemon-types"></ul>
            </div>
        </div>
    )
}