import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPokeData } from "../Services/PokemonServices";
import PokeCard from "./PokeCard";
import PokeDetail from "./PokeDetail";


export default function HomeCard(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let offset = 0;
  const limit = 10;

  const loadMorePokemon = () => {
    console.log('offset ' ,offset);
    getAllPokeData(limit,offset)
    .then(
        (result) => {
            setIsLoaded(true);
            const newPoke = result.results;
            setItems(oldPokemon => [...oldPokemon,...newPoke]);
            // console.log(pokeId)
            offset+=limit;
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
    )
  }

    const handleScroll = (e) =>{
        //  console.log(" top :", e.target.documentElement.scrollTop, " win ",window.innerHeight," heigh ",e.target.documentElement.scrollHeight);
        // cek apakah sudah sampai bawha
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >=
             e.target.documentElement.scrollHeight){
                console.log("mentok");
                loadMorePokemon();
        }
    }

    useEffect(() => {
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        // .then(res => res.json())
       loadMorePokemon();
        window.addEventListener('scroll',handleScroll);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log(items);
        const pokeList = items.map((item,index)=>{
            return <PokeCard 
                key={index}
                detail={item}
            />
        })
        return (
        <ul className="grid">
            {pokeList}
        </ul>
        );
    }
}