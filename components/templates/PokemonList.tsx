import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import Loader from "../../components/atoms/loader";
import {useTheme} from "@mui/material";
import PokemonCard from "../../components/organisms/PokemonCard";
import {useRouter} from "next/router";
import {getAllPokemonsByApi} from "../../services/pokemonGetter";

import {useSelector} from "react-redux";
import GenTitle from "../atoms/GenTitle";
import colors from "../atoms/colors";
import {styles} from "./StylesTemplates";


type Props = {
}


const resetPerScrollAmount = () => {
    const avgCardSize = { w: 360, h: 100 };
    return Math.ceil((window.innerWidth / avgCardSize.w) * (window.innerHeight / avgCardSize.h));
}

const styled = styles.PokemonList;

const PokemonList: React.FC<Props> = ({  }) => {

    const pokemonsPerPage = 27; //To achieve a personally chosen quantity of 42 pages.
    const [pageQuantity, setPageQuantity] = useState<number>(0);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [pageOffsetIndexShown, setPageOffsetIndexShown] = useState<number>(0);
    const [pageOffsetIndexShownEnd, setPageOffsetIndexShownEnd] = useState<number>(42);
    const [loading, setLoading] = useState<boolean>(true);

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonsPerScroll, setPokemonsPerScroll] = useState<number>(0);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [shownPokemons, setShownPokemons] = useState<Pokemon[]>([]);

    const theme = useTheme();

    const searchTerm = useSelector((s: {searchT: string}) => s.searchT);

    const StyledPagination = styled.Pagination(theme.palette.primary.main === colors.redBright);

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
        if(searchTerm !== "" && searchTerm){
            handlePageChange(null, 1)
        }
        filterPokemons(searchTerm);
    }, [searchTerm])

    useEffect(() => {
        showMorePokemons()
    }, [filteredPokemons])


    const fetchPokemonList = async () => {
        let pokes = await getAllPokemonsByApi();
        setPageQuantity(Math.ceil(pokes.length / pokemonsPerPage));
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



    const router = useRouter();
    useEffect(() => {
        if(router && router.query && router.query.page){
            changePage(parseInt(router.query.page as string));
        }
    }, [router.query.page])

    const handlePageChange = (event: React.ChangeEvent<unknown> | null, value: number) => {
        window.scrollTo(0, 0)
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
                    {searchTerm &&
                        <GenTitle
                            title={`${filteredPokemons.length} result${filteredPokemons.length === 1 ? '' : 's'} 
                                    for '${searchTerm}'`}/>
                    }
                    <styled.Grid spacing={2} container>
                        {filteredPokemons && filteredPokemons.slice(pageOffsetIndexShown, pageOffsetIndexShownEnd)
                            .map((pokemon: Pokemon, index: number) => (
                            <PokemonCard pokemonName={pokemon.name}
                                         isFirstOfPage={index === 0}
                                         key={`${pokemon.name}-${index}`}
                                         isCurrentlySearching={searchTerm.length > 0}/>
                        ))}
                    </styled.Grid>

                </>
            }
            {!searchTerm &&
                <StyledPagination
                            variant="text"
                            count={pageQuantity}
                            page={pageCurrent}
                            color="primary"
                            onChange={handlePageChange}/>
            }



        </>
    )
}
export default PokemonList;
