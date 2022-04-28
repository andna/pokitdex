import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {getAllPokemonsByApi} from "../../services/pokemonGetter";

const gridProps = {
    container:true,
    justifyContent: "center",
    spacing: 2
};

export default function PokemonList({  }) {

    const pokemonsPerPage = 27; //To achieve a personally chosen quantity of 42 pages.
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [pageOffsetIndexShown, setPageOffsetIndexShown] = useState<number>(0);
    const [pageOffsetIndexShownEnd, setPageOffsetIndexShownEnd] = useState<number>(pokemonsPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        fetchPokemonList();
    }, [])

    const fetchPokemonList = async () => {
        let pokes = await getAllPokemonsByApi();
        setPageQuantity(Math.ceil(pokes.length / pokemonsPerPage));
        setPokemons(pokes);
        setLoading(false);
    };



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

    useEffect(() => {
        if(router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])



    return (
        <>

            {loading ? <Loader /> :
                <>
                    <Grid {...gridProps}>
                        {pokemons && pokemons?.slice(pageOffsetIndexShown, pageOffsetIndexShownEnd)
                            .map((pokemon : Pokemon) => {
                                return <PokemonCard pokemonName={pokemon.name} key={pokemon.name}/>
                            })}
                    </Grid>

                </>
            }
            <Pagination count={pageQuantity}
                        page={pageCurrent}
                        onChange={handlePageChange}/>


        </>
    )
}
