import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import Loader from "../components/atoms/loader";
import {Pokemon} from "../types/Pokemon";
import PokemonCard from "../components/organisms/PokemonCard";
import Head from 'next/head'
import {loadPokemonByApi} from "../services/pokemonGetter";

const PokemonPage = () => {
    const router = useRouter()
    const {
        query: { pid },
    } = router

    return <>
        <PokemonCard pokemonName={pid as string}/>
    </>
}

export default PokemonPage