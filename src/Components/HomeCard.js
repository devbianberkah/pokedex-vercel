import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPokeData, getAllType } from "../Services/PokemonServices";
import PokeCard from "./PokeCard";
import {Offline,Online,Detector} from "react-detect-offline"

export default function HomeCard(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
//   const [searchInput, setSearchInput] = useState('')
//   const [filteredResults, setFilteredResults] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const [allType,setAllType] = useState([]);
  const [checkFilter,setCheckFilter] = useState([])
  let offset = 0;
  const limit = 10;

    const showHideFilter = (e) =>{
        setShowFilter(prevState=> !prevState);
    }  

    // const searchItems = (e) => {
    //     setSearchInput(e.target.value)
    //     if (searchInput !== '') {
    //         const filteredData = items.filter((item) => {
    //             return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
    //         })
    //         setFilteredResults(filteredData)
    //     }
    //     else{
    //         setFilteredResults(items)
    //     }
    //     console.log("res ",filteredResults)
    
    // }

    const loadMorePokemon = () => {
        console.log('offset ' ,offset);
        getAllPokeData(limit,offset)
        .then(
            (result) => {
                setIsLoaded(true);
                const newPoke = result.results;
                setItems(oldPokemon => [...oldPokemon,...newPoke]);
                // console.log(pokeId)
                filterPokemon();
                offset+=limit;
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    const filterPokemon = () => {
        // items.filter(checkFilter);
        // console.log("filter coy");
    }

    const loadAllType = () => {
        getAllType()
        .then(
            (result) => {
                setAllType(result.results);
                // console.log("semua type ",result.results);
            },
            (error) =>{
                console.log("eror load type",error.message);
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

    const handleFilterClicked = (e) =>{
        const { value,checked } = e.target;
       
        console.log(`${value} is ${checked}`);
        if ( checked ){
            setCheckFilter(...checkFilter,value)
        }
        else{
            setCheckFilter(checkFilter.filter((e) => e!==value))
        }
    }

    useEffect(() => {
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        // .then(res => res.json())
       loadMorePokemon();
       loadAllType();
        window.addEventListener('scroll',handleScroll);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const pokeList = items.map((item,index)=>{
            console.log(item);
            return <PokeCard 
                key={index}
                detail={item}
            />
        })
        const typeList = allType.map((type,index)=>{
            // console.log(type);
            return (
                <li>
                    <input className="filter-grid-item" type="checkbox" 
                    name="typeItem" key={index} value={index+1} onChange={handleFilterClicked} />{type.name}
                </li>
            )
        })
        return (
            <main className='page'>
                 {/* <input
                    type="text"
                    // value={this.state.searchValue}
                    onChange={searchItems}
                    /> */}
                <h1 className='page-title'>Pokedex</h1>
                <div className="header-right">
                    <button className="button button-text" onClick={showHideFilter}>Filter</button>
                </div>
                {
                    showFilter?
                    <div className="modal-content">
                        <div className="modal-content__section">
                            <h3 className="modal-content__subtitle">Tipe</h3>
                            <ul className="filter-grid">
                                {typeList}
                            </ul>
                        </div>
                    </div>
                    :null            
                }
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