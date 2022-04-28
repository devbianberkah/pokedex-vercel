import React from "react";
import HomeCard from "./HomeCard";
import Header from './Header';

export default function PageContent(){
    return (
        <div>
        <Header/>
          <main className='page'>
            <h1 className='page-title'>Pokedex</h1>
            <span></span>
        </main>
            <div className='page-content'>
                <HomeCard />
            </div>
        </div>
    )
}