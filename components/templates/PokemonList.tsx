import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";

export default function PokemonList({  }) {

    const pokemonsPerPage = 27;
    const [pokemons, setPokemons] = useState<Pokemon[]>();
    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(0);
    const [pageOffsetIndexShown, setPageOffsetIndexShown] = useState<number>(0);
    const [pageOffsetIndexShownEnd, setPageOffsetIndexShownEnd] = useState<number>(pokemonsPerPage);
    const [loading, setLoading] = useState<boolean>(true);
    const [redirectedToPage, setRedirectedToPage] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        getPokemons(0)
    }, [])

    useEffect(() => {
        if(!redirectedToPage && router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])


    const getPokemons = async (offset : number) => {
        const apiPokemonList = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
        const response = await fetch(apiPokemonList).then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(json => {
            setPageQuantity(Math.ceil(json.count / pokemonsPerPage));
            setPokemons(json.results);
            setLoading(false);
        })
        .catch(function (e) {
            console.error(e)
        });
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
                        {pokemons?.slice(pageOffsetIndexShown, pageOffsetIndexShownEnd)
                            .map((pokemon : Pokemon) => {
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
