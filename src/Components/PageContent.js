import React from "react";
import HomeCard from "./HomeCard";
import Header from './Header';

export default function PageContent(){
    return (
        <div>
          <Header/>
          <main className='page'>
            <span></span>
            <div className='page-content'>
                <HomeCard />
            </div>
          </main> 
        </div>
    )
}