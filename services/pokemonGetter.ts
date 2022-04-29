import list from "../pages/api/list";
import data from "../pages/api/data";
import {Pokemon} from "../types/Pokemon";

const localIdPreffix = 'pokemon-';
const localIdList = `${localIdPreffix}-list`;

export const getAllPokemonsByApi = async () => {

    const localList = localStorage.getItem(localIdList);

    if(localList){
        return JSON.parse(localList);
    } else {
        const apiPokemonList = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

        let results : Pokemon[] = [];

        await fetch(apiPokemonList).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(json => {
            results = json.results;
        })
            .catch(function (e) {
                console.error(e)
                results = [];
            });

        localStorage.setItem(localIdList, JSON.stringify(results));
        return results;
    }



}

export const loadPokemonByApi = async (name : string | string[] | undefined) => {

    let results : Pokemon | null = null;

    const apiPokemonList = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(apiPokemonList).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    }).then(json => {
            results = json;
        })
        .catch(function (e) {
            console.error(e);
        });

    return results;
}


const compare = (pokemonId: number, specificIndex: number, mustBeEqual: boolean) => {
    if (mustBeEqual) {
        return pokemonId === specificIndex;
    } else {
        return pokemonId > specificIndex;
    }
}

export const getTitle = (index: number, mustBeEqual: boolean = false) => {
    const positions = [
        {pos: 0, title: '1st Gen'},
        {pos: 152, title: '2nd Gen'},
        {pos: 252, title: '3rd Gen'},
        {pos: 387, title: '4th Gen'},
        {pos: 494, title: '5th Gen'},
        {pos: 650, title: '6th Gen'},
        {pos: 722, title: '7th Gen'},
        {pos: 810, title: '8th Gen'},
        {pos: 10001, title: 'Forms'},
        {pos: 10033, title: 'Mega Evolutions'},
        {pos: 10080, title: 'Other Forms'},
        {pos: 10195, title: 'Gmax Forms'},
    ];
    let foundTitle = '';
    positions.forEach(position => {
        if(compare(index, position.pos, mustBeEqual)){
            foundTitle = position.title;
        }
    });
    return foundTitle;
}

export const changeDashForSpace = (stringToChange : string) => {
    return stringToChange.split("-").join(" ");
}
