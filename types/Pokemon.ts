import {Simplex} from "./Simplex";

interface Ability extends Simplex{
}

interface AbilityObject{
    ability: Ability;
    name: string;
    url: string;
    is_hidden: boolean;
    slot: number;
}

interface GameIndice{
    game_index: number;
    version: Simplex;
}

interface SimplexSprites{
    back_default: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
}

interface Sprites extends SimplexSprites{
}

export interface Type{
    type: Simplex;
    slot: number;
}

export interface Pokemon extends Simplex{
    abilities: AbilityObject[];
    base_experience: number;
    forms: Simplex[]
    game_indices: GameIndice[]
    height: number
    held_items: Simplex[]
    id: number
    is_default: boolean;
    location_area_encounters: string;
    //moves: any[]
    order: number;
    //past_types: any[];
    species: Simplex;
    sprites: Sprites;
    //stats: [{base_stat: 45, effort: 0, stat: {name: "hp", url: "https://pokeapi.co/api/v2/stat/1/"}},…]
    types: Type[];
    weight: number;
}