import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPokeData } from "../Services/PokemonServices";
import PokeCard from "./PokeCard";
import {Offline,Online,Detector} from "react-detect-offline"

export default function HomeCard(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const [filteredResults, setFilteredResults] = useState([]);
  let offset = 0;
  const limit = 10;

  const searchItems = (e) => {
    setSearchInput(e.target.value)
    if (searchInput !== '') {
        const filteredData = items.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(items)
    }
    console.log("res ",filteredResults)
   
 }

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
            <main className='page'>
                 {/* <input
                    type="text"
                    // value={this.state.searchValue}
                    onChange={searchItems}
                    /> */}
                <h1 className='page-title'>Pokedex</h1>
                <Online>
                <div className='page-content'>
                       <ul className="grid">
                            {pokeList}
                        </ul>
                </div>
                </Online>
                <Offline>
                        <div className="offline-stats">
                            Koneksi Offline
                        </div>
                </Offline>
          </main> 
       
        );
    }
}