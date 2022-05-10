const URL = 'https://pokeapi.co/api/v2';

export const getPokeDetailData = (pokemonName) => {
    return fetch(`${URL}${pokemonName}`).then((response)=>response.json())
};

export const getAllPokeData = (limit,offset) => {
    return fetch(`${URL}/pokemon?limit=${limit}&offset=${offset}`).then((response)=>response.json())
};

export const getAllType = () => {
    return fetch(`${URL}/type`).then((response)=>response.json())
};

export const getHomePokeDetailData = (fullurl) => {
    return fetch(`${fullurl}`).then((response)=>response.json())
}