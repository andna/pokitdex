import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import Loader from "../components/atoms/loader";
import {Pokemon} from "../types/Pokemon";
import PokemonCard from "../components/organisms/PokemonCard";
import Head from 'next/head'

const PokemonPage = () => {
    const router = useRouter()
    const {
        query: { pid },
    } = router

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ pokemon, setPokemon ] = useState<Pokemon>({} as Pokemon);

    useEffect(()=>{
        if(!router.isReady) return;
        getPokemon(pid);

    }, [router.isReady]);



    const getPokemon = async (id: string | string[] | undefined) => {

        const apiPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(apiPokemon).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
            .then(json => {
                setLoading(false);
                setPokemon(json);
            })
            .catch(function (e) {
                console.error(e)
            });

    };


    return <>
        {loading && <Loader />}
        {pokemon && pokemon.name && <>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <PokemonCard pokemon={pokemon}/>

        </>}
    </>
}

export default PokemonPage