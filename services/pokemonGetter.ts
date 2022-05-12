import {AbilityObject, Pokemon, ShallowPokemon, Sprites} from "../types/Pokemon";
import {Simplex} from "../types/Simplex";

const localIdPreffix = 'pokemon-';
const localIdList = `${localIdPreffix}list`;

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
            results = json.results.map((result: Simplex) => {
                return {name: result.name}
            });
        })
            .catch(function (e) {
                console.error(e)
                results = [];
            });

        localStorage.setItem(localIdList, JSON.stringify(results));
        return results;
    }



}

export const loadPokemonByApi = async (name : string | string[] | undefined, needsFullInfo : boolean = false) => {

    let result : Pokemon | null = null;

    const customPokemon = localStorage.getItem(`custom-${name}`);
    const shallowPokemon = localStorage.getItem(`shallow-${name}`);

    if(customPokemon){
        result = JSON.parse(customPokemon);
    } else if (shallowPokemon && !needsFullInfo) {
        result = JSON.parse(shallowPokemon);
    } else {
        const apiPokemonList = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await fetch(apiPokemonList).then(response =>  response.json())
            .then(json => {
                result = json;
                const sprites = json.sprites
                const shortSprites = sprites && findSprites(sprites);
                const types = json.types;
                const shortTypes = types && [
                    {slot: 1, type: {name: types[0].type.name}}
                ];
                if(types && types[1]){
                    shortTypes.push(
                        {slot: 2, type: {name: types[1].type.name}}
                    )
                }
                const newShallowPokemon: ShallowPokemon = {
                    id: json.id,
                    name: json.name,
                    types: shortTypes,
                    species: {name: json.species.name},
                    sprites: shortSprites
                };
                localStorage.setItem(`shallow-${json.name}`, JSON.stringify(newShallowPokemon));
            })
            .catch(function (e) {
                console.error(e);
            });

    }

    return result;
}

const findSprites = (sprites : Sprites) => {
    return {
        ...(sprites.front_default ?
                {front_default: sprites.front_default}
                :
                (sprites.front_shiny ?
                        {front_shiny: sprites.front_shiny}
                        :
                        (
                            sprites.other?.home?.front_default ?
                                { other: { home: {front_default : sprites.other?.home?.front_default}}}
                                :
                                (  (sprites.other && sprites.other["official-artwork"]?.front_default) ?
                                        { other: { ["official-artwork"]: {front_default : sprites.other["official-artwork"]?.front_default}}}
                                        :
                                        (
                                            (sprites.versions && sprites.versions["generation-viii"]?.icons?.front_default) ?
                                                { other: { ["generation-viii"]: {icons: {front_default : sprites.versions["generation-viii"]?.icons?.front_default}}}}
                                                :
                                                {front_default: null}
                                        )
                                )
                        )
                )
        ),
    }
}

const compare = (pokemonId: number, specificIndex: number, mustBeEqual: boolean) => {
    if (mustBeEqual) {
        return pokemonId === specificIndex;
    } else {
        return pokemonId >= specificIndex;
    }
}

export const getTitle = (index: number, mustBeEqual: boolean = false) => {
    const positions = [

        {pos: 1, title: '1st Gen'},
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
    if(index < 0){
        positions.unshift({pos: -10000, title: 'Custom'});
    }

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

export const addPokemon = (pokemonFormValues: any) => {

    const ccId = 'custom-count';
    let customCount = parseInt(localStorage.getItem(ccId) as string) || 0;
    customCount++;
    localStorage.setItem(ccId, customCount.toString());

    const fullName = `${pokemonFormValues.name}` +
        (pokemonFormValues.subname ? `-${pokemonFormValues.subname}` : '');

    const currentPokemonList = JSON.parse(localStorage.getItem(localIdList) as string);
    currentPokemonList.unshift({name: fullName});
    localStorage.setItem(localIdList, JSON.stringify(currentPokemonList));

    const typesToAdd = [{slot: 1, type: {name: pokemonFormValues.type1}}];
    if ( pokemonFormValues.type2 && pokemonFormValues.type2 !== 'none' ) {
        typesToAdd.push({slot: 2, type: {name: pokemonFormValues.type2}});
    }
    const abilitiesToAdd : AbilityObject[] = [
        {slot: 0, Ability: {name: pokemonFormValues.ability1}, is_hidden: false}
    ];
    if(pokemonFormValues.ability2){
        abilitiesToAdd.push({slot: 1, Ability: {name: pokemonFormValues.ability2}, is_hidden: false})
    }
    if(pokemonFormValues.abilityHidden){
        abilitiesToAdd.push({slot: 2, Ability: {name: pokemonFormValues.abilityHidden}, is_hidden: true})
    }

    const newPokemon : Pokemon = {
        base_experience: pokemonFormValues.experience_base,
        height: pokemonFormValues.height,
        id: customCount * -1,
        is_default: false,
        name: fullName,
        species: {name: pokemonFormValues.name},
        sprites: {
            front_default: pokemonFormValues.imgLink1,
            ...(pokemonFormValues.imgLink2 && pokemonFormValues.imgLink2 !== ''
                ? { other: {["official-artwork"]: { front_default: pokemonFormValues.imgLink2}}} : null)
        },
        types: typesToAdd,
        weight: pokemonFormValues.weight,
        stats: [
            {stat:{ name: 'hp'}, base_stat:pokemonFormValues.hp_base, effort:pokemonFormValues.hp_effort},
            {stat:{ name: 'attack'}, base_stat:pokemonFormValues.attack_base, effort:pokemonFormValues.attack_effort},
            {stat:{ name: 'defense'}, base_stat:pokemonFormValues.defense_base, effort:pokemonFormValues.defense_effort},
            {stat:{ name: 'special-attack'}, base_stat:pokemonFormValues['spc_attack_base'], effort:pokemonFormValues['spc_attack_effort']},
            {stat:{ name: 'special-defense'}, base_stat:pokemonFormValues['spc_defense_base'], effort:pokemonFormValues['spc_defense_effort']},
            {stat:{ name: 'speed'}, base_stat:pokemonFormValues.speed_base, effort:pokemonFormValues.speed_effort},
        ],
        moves: [],
        order: -1,
        past_types: [],
        forms: [],
        game_indices: [],
        held_items: [],
        location_area_encounters: "",
        abilities: abilitiesToAdd,
    }

    localStorage.setItem(`custom-${fullName}`, JSON.stringify(newPokemon));



}

export const deleteCustom = (name: string) => {
    localStorage.removeItem(`custom-${name}`);

    const currentPokemonList = JSON.parse(localStorage.getItem(localIdList) as string);
    const newPokemonList =  currentPokemonList.filter((poke: Pokemon) => poke.name !== name);
    localStorage.setItem(localIdList, JSON.stringify(newPokemonList));

    const ccId = 'custom-count';
    let customCount = parseInt(localStorage.getItem(ccId) as string) || 0;
    customCount--;
    localStorage.setItem(ccId, customCount.toString());



}
