import { useRouter } from 'next/router'
import PokemonCard from "../components/organisms/PokemonCard";
import Loader from "../components/atoms/loader";
import {useEffect, useState} from "react";

const PokemonPage = () => {
    const router = useRouter()
    const { query: {pid} } = router

    const [loadedPokemon, setLoadedPokemon] = useState<boolean>(false);

    useEffect(()=>{
        console.log(router)
        if(!router.isReady) return;
        setLoadedPokemon(true)

    }, [router.isReady]);
    useEffect(()=>{
        //setLoadedPokemon(false);
    }, [router]);

    return <>
        {loadedPokemon ?
            <PokemonCard pokemonName={pid as string} isPage/>
            :
            <Loader />
        }


    </>
}

export default PokemonPage
