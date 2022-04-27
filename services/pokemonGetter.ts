import list from "../pages/api/list";
import data from "../pages/api/data";

export const getAllPokemonsByApi = async () => {
    const apiPokemonList = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    const response = await fetch(apiPokemonList).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
        }).then(json => {
            return json.results;
        })
        .catch(function (e) {
            console.error(e)
        });

    return list; //[];
}

export const loadPokemonByApi = async (name : string) => {

    const localData = localStorage.getItem(`pokemon/${name}`);
    if (localData) {
        return localData;
    } else {
        const apiPokemonList = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await fetch(apiPokemonList).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(json => {
                localStorage.setItem(`pokemon/${name}`, JSON.stringify(json));
                return json;
            })
            .catch(function (e) {
                console.error(e)
                return data;
            });
    }
}