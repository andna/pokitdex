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
