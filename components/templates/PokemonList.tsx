import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination, useTheme} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {getAllPokemonsByApi} from "../../services/pokemonGetter";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import GenTitle from "../atoms/GenTitle";
import {reducersTypes} from "../../app/store";

const styles = {
    grid: {
    container:true,
    justifyContent: "center",
    spacing: 2
    },
    pagination: {
        position: 'fixed',
        justifyContent: 'center',
        background: '#2b1f2c',
        height: 42,
        bottom: '5vh',
        borderRadius: 20,
        boxShadow: '0 3px 6px rgba(0,0,0,.25)',
        display: 'none' as 'none'
    }
};

type Props = {
}


const resetPerScrollAmount = () => {
    const avgCardSize = { w: 360, h: 100 };
    return Math.ceil((window.innerWidth / avgCardSize.w) * (window.innerHeight / avgCardSize.h));
}

const PokemonList: React.FC<Props> = ({  }) => {

    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(true);

    const searchTerm = useSelector((s: reducersTypes) => s.searchT);
    const pokemons = useSelector((s: reducersTypes) => s.pokemons);
    const filteredPokemons = useSelector((s: reducersTypes) => s.filteredPokemons);
    const shownPokemons = useSelector((s: reducersTypes) => s.shownPokemons);
    const pokemonsPerScroll = useSelector((s: reducersTypes) => s.pokemonsPerScroll);
    const lastScrollY = useSelector((s: reducersTypes) => s.lastScrollY);

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        //console.log('aaa1',window.scrollY, lastScrollY);
        //window.scrollTo({top: lastScrollY});
        dispatch({ type: "SET_POKEMONS_PER_SCROLL", payload: resetPerScrollAmount() });
    }, [])

    useEffect(() => {
        if(pokemonsPerScroll > 0){
            fetchPokemonList();
        }
    }, [pokemonsPerScroll])

    useEffect(() => {
        filterPokemons(searchTerm, true);
    }, [searchTerm])

    useEffect(() => {
        showMorePokemons()
    }, [filteredPokemons])


    const fetchPokemonList = async () => {
        let pokes = await getAllPokemonsByApi();
        //setPageQuantity(Math.ceil(pokes.length / pokemonsPerScroll));

        dispatch({ type: "SET_POKEMONS", payload: pokes });
        filterPokemons(searchTerm, false, pokes);
        setLoading(false);
    };

    const showMorePokemons = () => {
        dispatch({ type: "SET_POKEMONS_PER_SCROLL", payload: resetPerScrollAmount() });

        const pokemonsSlice = filteredPokemons.slice(shownPokemons.length, shownPokemons.length + pokemonsPerScroll)
        const newShownPokemons = [...shownPokemons, ...pokemonsSlice];
        dispatch({ type: "SET_SHOWN_POKEMONS", payload: newShownPokemons });
    };

    const filterPokemons = (filterString : string, comesFromSearching: boolean, pokes : Pokemon[] = pokemons) => {
        const newFilteredPokemons = pokes.filter((pokemon: Pokemon) => {
            const enters = pokemon.name
                .toLowerCase().includes(filterString.toLowerCase());
            return enters;
        });
        dispatch({ type: "SET_FILTERED_POKEMONS", payload: newFilteredPokemons });
        let slicePos = {init: 0, end: shownPokemons.length + pokemonsPerScroll};
        if ( comesFromSearching){
            slicePos = {init: 0, end: pokemonsPerScroll}
        }

        const slicedPokemons = newFilteredPokemons.slice(slicePos.init, slicePos.end);
        dispatch({ type: "SET_SHOWN_POKEMONS", payload: slicedPokemons });
    }

    function clickedOnPokemon (pokeName: string){

        dispatch({ type: "SET_LAST_SCROLL_Y", payload: window.scrollY });
        router.push(`/${pokeName}`);
    }

    /*

    useEffect(() => {
        if(router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        //window.scrollTo(0, 4000)
        //changePage(value);
    };

    const changePage = (toPage : number) => {
        setPageCurrent(toPage);
        const pageOffsetIndex = (toPage - 1) * pokemonsPerScroll;
        const pageOffsetIndexEnd = pageOffsetIndex + pokemonsPerScroll;
        router.push(`/?page=${toPage}`, undefined, { shallow: true })
    }*/

    return (
        <>

            {loading ? <Loader /> :
                <>
                    {searchTerm &&
                        <GenTitle
                            title={`${filteredPokemons.length} result${filteredPokemons.length === 1 ? '' : 's'} 
                                    for '${searchTerm}'`}/>
                    }
                    <InfiniteScroll
                        dataLength={shownPokemons.length}
                        next={showMorePokemons}
                        hasMore={true}
                        loader={""}
                        scrollThreshold={0.8}
                        initialScrollY={lastScrollY}
                        style={{ overflow: "unset" }}
                    >
                        <Grid {...styles.grid}>
                            {shownPokemons.map((pokemon: Pokemon, index: number) => (
                                <PokemonCard pokemonName={pokemon.name}
                                             isCurrentlySearching={searchTerm.length > 0}
                                             isFirstOfPage={index === 0}
                                             clickedOnPokemon={clickedOnPokemon}
                                             key={`${pokemon.name}-${index}`} />
                            ))}
                        </Grid>
                    </InfiniteScroll>

                </>
            }
            {/*
            <Pagination sx={styles.pagination} count={pageQuantity}
                        page={pageCurrent}
                        color="primary"
                        onChange={handlePageChange}/>
            */}


        </>
    )
}
export default PokemonList;
