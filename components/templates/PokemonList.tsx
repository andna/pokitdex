import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {getAllPokemonsByApi} from "../../services/pokemonGetter";
import InfiniteScroll from "react-infinite-scroll-component";
import {useSelector} from "react-redux";

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


const pokemonsPerScroll = 50;

type Props = {
}

const PokemonList: React.FC<Props> = ({  }) => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [shownPokemons, setShownPokemons] = useState<Pokemon[]>([]);
    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        fetchPokemonList();
    }, [])

    const fetchPokemonList = async () => {
        let pokes = await getAllPokemonsByApi();
        setPageQuantity(Math.ceil(pokes.length / pokemonsPerScroll));
        setPokemons(pokes);
        setFilteredPokemons(pokes);
        setLoading(false);
    };

    useEffect(() => {
        showMorePokemons()
    }, [filteredPokemons])



    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scrollTo(0, 4000)
        //changePage(value);
    };

    const changePage = (toPage : number) => {
        setPageCurrent(toPage);
        const pageOffsetIndex = (toPage - 1) * pokemonsPerScroll;
        const pageOffsetIndexEnd = pageOffsetIndex + pokemonsPerScroll;
        router.push(`/?page=${toPage}`, undefined, { shallow: true })
    }

    useEffect(() => {
        if(router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])


    function showMorePokemons(){
        setShownPokemons(oldPokemons => {
            const initSlice = searchTerm ? 0 : oldPokemons.length;
            const pokemonsSlice = filteredPokemons.slice(initSlice, initSlice + pokemonsPerScroll)
            return [...(searchTerm ? [] : oldPokemons), ...pokemonsSlice];
        });
    }

    setTimeout(()=>{
        //window.scrollTo({top: 3000})
    }, 3000)


    const searchTerm = useSelector((s: {searchT: string}) => s.searchT);


    useEffect(() => {
        const pokemonsFiltered = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPokemons(pokemonsFiltered);
    }, [searchTerm])

    return (
        <>

            {loading ? <Loader /> :
                <>
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
                                             isFirstOfPage={index === 0}
                                             key={`${pokemon.name}-${index}`} />
                            ))}
                        </Grid>
                    </InfiniteScroll>

                </>
            }
            <Pagination sx={styles.pagination} count={pageQuantity}
                        page={pageCurrent}
                        color="primary"
                        onChange={handlePageChange}/>


        </>
    )
}
export default PokemonList;
