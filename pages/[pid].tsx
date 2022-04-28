import { useRouter } from 'next/router'
import PokemonCard from "../components/organisms/PokemonCard";
import Loader from "../components/atoms/loader";
import {useEffect, useState} from "react";

const PokemonPage = () => {
    const router = useRouter()
    const { query: {pid} } = router

    const [loadedPokemon, setLoadedPokemon] = useState<boolean>(false);

    useEffect(()=>{
        if(!router.isReady) return;
        setLoadedPokemon(true)

    }, [router.isReady]);

    return <>
        {loadedPokemon ?
            <PokemonCard pokemonName={pid as string}/>
            :
            <Loader />
        }


    </>
}

export default PokemonPage
