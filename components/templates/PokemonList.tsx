import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {getAllPokemonsByApi} from "../../services/pokemonGetter";
import InfiniteScroll from "react-infinite-scroll-component";
import {useSelector} from "react-redux";
import GenTitle from "../atoms/GenTitle";

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

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsPerScroll, setPokemonsPerScroll] = useState<number>(0);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [shownPokemons, setShownPokemons] = useState<Pokemon[]>([]);

    const searchTerm = useSelector((s: {searchT: string}) => s.searchT);

    useEffect(() => {
        window.scrollTo(0, 0)
        setPokemonsPerScroll(resetPerScrollAmount())
    }, [])

    useEffect(() => {
        if(pokemonsPerScroll > 0 && pokemons.length === 0){
            fetchPokemonList();
        }
    }, [pokemonsPerScroll])

    useEffect(() => {
        filterPokemons(searchTerm);
    }, [searchTerm])

    useEffect(() => {
        showMorePokemons()
    }, [filteredPokemons])


    const fetchPokemonList = async () => {
        let pokes = await getAllPokemonsByApi();
        //setPageQuantity(Math.ceil(pokes.length / pokemonsPerScroll));
        setPokemons(pokes);
        filterPokemons(searchTerm, pokes);
        setLoading(false);
    };

    const showMorePokemons = () => {
        setPokemonsPerScroll(resetPerScrollAmount())
        setShownPokemons(oldShownPokemons => {
            const heroesSlice = filteredPokemons.slice(oldShownPokemons.length, oldShownPokemons.length + pokemonsPerScroll)
            return [...oldShownPokemons, ...heroesSlice];
        });
    };

    const filterPokemons = (filterString : string, pokes : Pokemon[] = pokemons) => {
        const newFilteredPokemons = pokes.filter((pokemon: Pokemon) => {
            const enters = pokemon.name
                .toLowerCase().includes(filterString.toLowerCase());
            return enters;
        });
        setFilteredPokemons(newFilteredPokemons);
        const slicedHeroes = newFilteredPokemons.slice(0, pokemonsPerScroll);
        setShownPokemons(slicedHeroes);
    }

    /*

    const router = useRouter();
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
                        style={{ overflow: "unset" }}
                    >
                        <Grid {...styles.grid}>
                            {shownPokemons.map((pokemon: Pokemon, index: number) => (
                                <PokemonCard pokemonName={pokemon.name}
                                             isCurrentlySearching={searchTerm.length > 0}
                                             isFirstOfPage={index === 0}
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
