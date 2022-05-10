import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllPokeData, getAllType, getHomePokeDetailData } from "../Services/PokemonServices";
import PokeCard from "./PokeCard";
import PokeHomeCard from "./PokeHomeCard";
import {Offline,Online,Detector} from "react-detect-offline"
import { getPokeDetailData } from "../Services/PokemonServices";

export default function HomeCard(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsDetailed, setItemsDetailed] = useState([]);
//   const [searchInput, setSearchInput] = useState('')
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const [allType,setAllType] = useState([]);
  const [checkFilter,setCheckFilter] = useState([])
  let offset = 0;
  const limit = 10;

    const showHideFilter = (e) =>{
        setShowFilter(prevState=> !prevState);
    }  

    // get All type
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
        // console.log('offset ' ,offset);
        // getAllPokeData(limit,offset)
        // .then((result) => {
        //         Promise.all(
        //             const newPokes = result.results;
        //             // newPokes.map()
        //             // loadDetailedData(newPokes);
        //         ),

        //         // const newPoke = result.results;
        //         // // console.log(newPoke)
        //         // setItems(oldPokemon => [...oldPokemon,...newPoke]);
        //         // // newPoke.sort()
        //         // loadDetailedData(items);
        //         // // v1 setIsLoaded(true);
        //         // setIsLoaded(true);

        //         // filterPokemon();
        //         // offset+=limit;
        //     },
        //     (error) => {
        //         setIsLoaded(true);
        //         setError(error);
        //     }
        // )
        getAllPokeData(limit,offset)
            .then((json) =>{
                const newPokes = json.results;
                console.log(newPokes);
                Promise.all(
                        newPokes.map((item)=>getHomePokeDetailData(item.url)
                    )
                ).then(
                    (datas) => {
                        setIsLoaded(true);
                        offset+=limit;
                        console.log(datas);
                        setItemsDetailed(oldPokes => [...oldPokes,...datas]);
                    }
                )
            });
    }

    const loadDetailedData = (poke) => {
        // console.log(poke);
        poke.map((item,index)=>{
            getHomePokeDetailData(item.url)
                .then((result)=>{
                    // setIsLoaded(true);
                    // console.log(result);
                    setItemsDetailed(oldDetailedData => [...oldDetailedData,result])
                },
                (error) => {
                    console.log(error)
                    // setIsLoaded(true)
                    // setError(true)
                }
            );  
        })
        // console.log(i)
        // itemsDetailed.sort((a,b)=>a.id-b.id);
    }


    const handleScroll = (e) =>{
        //  console.log(" top :", e.target.documentElement.scrollTop, " win ",window.innerHeight," heigh ",e.target.documentElement.scrollHeight);
        // cek apakah sudah sampai bawha
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >=
             e.target.documentElement.scrollHeight){
                // console.log("mentok");
                loadMorePokemon();
        }
    }

    const handleFilterClicked = (e) =>{
        const { value,checked } = e.target;
       
        // console.log(`${value} is ${checked}`);
        if ( checked ){
            setCheckFilter([...checkFilter,value])
        }
        else{
            setCheckFilter(checkFilter.filter((e) => e!==value))
        }
        // console.log(checkFilter);

        // filterPokemon();
    }

    const filterPokemon = () => {
        // items.filter(checkFilter);

        if(checkFilter.length === 0){
            // console.log(`len 0`);
            setFilteredResults(itemsDetailed);
        }
        else{
            // console.log(`len tidak 0`);
            const filteredData = itemsDetailed.filter((item)=>{
                // checkFilter.some(pilter => item.types)
                const pokeTypes = item.types;
                let tipeStrings = [];
                pokeTypes.map((type)=>{
                    // return item;
                    tipeStrings = [...tipeStrings,type.type.name];
                    // if (checkFilter.includes(type.type.name)){
                        // console.log(item.name," ada");
                        // const newItems = [];
                        // setFilteredResults([...newItems,item])
                    // }
                })
                if (checkFilter.includes(tipeStrings.flat())){
                    // console.log(item.name," ada");
                    // const newItems = [];
                    // setFilteredResults([...newItems,item])
                }
                // console.log(tipeStrings);
                // checkFilter.some(category => [item.])
                // return item;
            });    
            // console.log(filteredData);
        }
        // console.log("filter coy");
    }


    useEffect(() => {
        // fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        // .then(res => res.json())
        loadAllType();
        loadMorePokemon();
        window.addEventListener('scroll',handleScroll);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // const pokeList = items.map((item,index)=>{
        //     // console.log(item);
        //     return <PokeCard 
        //         key={index}
        //         detail={item}
        //     />
        // })
            // console.log(item);
       
        const pokeList = itemsDetailed.map((item,index)=>{
            return <PokeHomeCard 
                key={index}
                detail={item}
            />
        })
        const typeList = allType.map((type,index)=>{
            return (
                <li>
                    <input className="filter-grid-item" type="checkbox" 
                    name="typeItem" key={index} value={type.name} onChange={handleFilterClicked} />{type.name}
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