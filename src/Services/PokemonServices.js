const URL = 'https://pokeapi.co/api/v2';

export const getPokeDetailData = (pokemonName) => {
    return fetch(`${URL}${pokemonName}`).then((response)=>response.json());
};