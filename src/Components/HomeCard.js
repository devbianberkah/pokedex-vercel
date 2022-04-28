import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PokeCard from "./PokeCard";
import PokeDetail from "./PokeDetail";


export default function HomeCard(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.results);
                // console.log(pokeId)
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
        // console.log(items);
        const pokeList = items.map(item=>{
            return <PokeCard 
                key={item.index}
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