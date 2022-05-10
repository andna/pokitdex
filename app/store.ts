import {combineReducers} from "@reduxjs/toolkit";
import {Pokemon} from "../types/Pokemon";

const SearchTermReducer = (state = '', action: { type: string, payload: string}) => {
    switch (action.type) {
        case "SET":
            return  action.payload;
        default:
            return state;
    }
};
const PokemonsReducer = (state: Pokemon[] = [], action: { type: string, payload: Pokemon[]}) => {
    switch (action.type) {
        case "SET_POKEMONS":
            return  action.payload;
        default:
            return state;
    }
};
const FilteredPokemonsReducer = (state: Pokemon[] = [], action: { type: string, payload: Pokemon[]}) => {
    switch (action.type) {
        case "SET_FILTERED_POKEMONS":
            return  action.payload;
        default:
            return state;
    }
};
const ShownPokemonsReducer = (state: Pokemon[] = [], action: { type: string, payload: Pokemon[]}) => {
    switch (action.type) {
        case "SET_SHOWN_POKEMONS":
            return  action.payload;
        default:
            return state;
    }
};
const PokemonsPerScrollReducer = (state: number = 0, action: { type: string, payload: number}) => {
    switch (action.type) {
        case "SET_POKEMONS_PER_SCROLL":
            return  action.payload;
        default:
            return state;
    }
};
const LastScrollYReducer = (state: number = 0, action: { type: string, payload: number}) => {
    switch (action.type) {
        case "SET_LAST_SCROLL_Y":
            return  action.payload;
        default:
            return state;
    }
};

export interface reducersTypes {
    searchT: string,
    pokemons: Pokemon[],
    filteredPokemons: Pokemon[],
    shownPokemons: Pokemon[],
    pokemonsPerScroll: number,
    lastScrollY: number,
}

export const rootReducer = combineReducers({
    searchT: SearchTermReducer,
    pokemons: PokemonsReducer,
    filteredPokemons: FilteredPokemonsReducer,
    shownPokemons: ShownPokemonsReducer,
    pokemonsPerScroll: PokemonsPerScrollReducer,
    lastScrollY: LastScrollYReducer
});
