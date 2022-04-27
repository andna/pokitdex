import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {loadPokemonByApi, getAllPokemonsByApi} from "../../services/pokemonGetter";
import {Simplex} from "../../types/Simplex";

export default function PokemonList({  }) {

    const pokemonsStorageDataId = 'pokemons-list';
    const pokemonsPerPage = 27;
    const [pokemons, setPokemons] = useState<Simplex[]>();
    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [pageOffsetIndexShown, setPageOffsetIndexShown] = useState<number>(0);
    const [pageOffsetIndexShownEnd, setPageOffsetIndexShownEnd] = useState<number>(pokemonsPerPage);
    const [loading, setLoading] = useState<boolean>(true);
    const [redirectedToPage, setRedirectedToPage] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        initialPokemons();
    }, [])

    const initialPokemons = async () => {
        if (localStorage.getItem(pokemonsStorageDataId)){
            initPokemons(JSON.parse(localStorage.getItem(pokemonsStorageDataId) as string));
        } else {
            const pokes = await getAllPokemonsByApi();
            localStorage.setItem(pokemonsStorageDataId, JSON.stringify(pokes));
            initPokemons(pokes);
        }
    };

    useEffect(() => {
        if(!redirectedToPage && router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])


    useEffect(() => {
        loadShownPokes();
    }, [pageOffsetIndexShown])

    const loadShownPokes = () => {

        if(pageOffsetIndexShown && pokemons?.length){
            pokemons.map(async (pokemon, i) => {
                if(i >= pageOffsetIndexShown && i < (pageOffsetIndexShown + pokemonsPerPage)){
                    loadPokemonByApi(pokemon.name);
                }
            });
        }
    }

    const initPokemons = async (pokemonsData : Simplex[]) => {
        setPokemons(pokemonsData);
        setPageQuantity(Math.ceil(pokemonsData.length / pokemonsPerPage));
        setLoading(false);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        changePage(value);
    };


    const changePage = (toPage : number) => {
        setPageCurrent(toPage);
        const pageOffsetIndex = (toPage - 1) * pokemonsPerPage;
        const pageOffsetIndexEnd = pageOffsetIndex + pokemonsPerPage;
        setPageOffsetIndexShown(pageOffsetIndex);
        setPageOffsetIndexShownEnd(pageOffsetIndexEnd);
        router.push(`/?page=${toPage}`, undefined, { shallow: true })

    }


    return (
        <>

            {loading ? <Loader /> :
                <>
                    <Grid container justifyContent="center" spacing={2}>
                        {pokemons && pokemons?.slice(pageOffsetIndexShown, pageOffsetIndexShownEnd)
                            .map((pokemon : Simplex) => {
                                return <PokemonCard pokemon={pokemon} key={pokemon.name}/>
                            })}
                    </Grid>
                    <Pagination count={pageQuantity}
                                page={pageCurrent}
                                onChange={handlePageChange}/>
                </>
            }


        </>
    )
}
