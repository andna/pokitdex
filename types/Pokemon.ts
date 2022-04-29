import {Simplex} from "./Simplex";

export interface Pokemon extends Simplex{
    abilities: AbilityObject[];
    moves: Move[]
    stats: Stat[];
    base_experience: number;
    forms: Simplex[]
    game_indices: GameIndice[]
    height: number
    held_items: Simplex[]
    id: number
    is_default: boolean;
    location_area_encounters: string;
    order: number;
    //past_types: any[];
    species: Simplex;
    sprites: Sprites;
    types: Type[];
    weight: number;
}


export interface AbilityObject{
    ability: Simplex;
    name: string;
    url: string;
    is_hidden: boolean;
    slot: number;
}
export interface Move{
    move: Simplex;
    version_group_details: VersionGroupDetail[];
}
export interface Stat{
    base_stat: number;
    effort: number;
    stat: Simplex;
}

export interface VersionGroupDetail{
    level_learned_at: number;
    move_learn_method: Simplex;
    version_group: Simplex;
}

export interface Sprites{
    back_default: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: any;
    versions: any;
}

interface GameIndice{
    game_index: number;
    version: Simplex;
}


export interface Type{
    type: Simplex;
    slot: number;
}
