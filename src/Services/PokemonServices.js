const URL = 'https://pokeapi.co/api/v2';

export const getPokeDetailData = (pokemonName) => {
    return fetch(`${URL}${pokemonName}`).then((response)=>response.json())
};

export const getAllPokeData = (limit,offset) => {
    return fetch(`${URL}/pokemon?limit=${limit}&offset=${offset}`).then((response)=>response.json())
};

export const serialConverter = (val) => {
    var str = "" + val
    var pad = "000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return ans;
}