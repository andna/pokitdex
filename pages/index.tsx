import React, {useEffect, useState} from "react";
import {Pokemon} from "../types/Pokemon";
import Loader from "../components/atoms/loader";
import {Grid, Pagination} from "@mui/material";
import PokemonCard from "../components/organisms/PokemonCard";

export default function Home() {

  const pokemonsPerPage = 27;
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [pageQuantity, setPageQuantity] = useState<number>(0);
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [pageOffsetIndexShown, setPageOffsetIndexShown] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    getPokemons(0)
  }, [])


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
    console.log(value);
    setPageCurrent(value);
    setPageOffsetIndexShown((value - 1) * pokemonsPerPage);
  };

  return (
    <>

      {loading ? <Loader /> :
          <>
            <Grid container justifyContent="center" spacing={2}>
              {pokemons?.slice((pageOffsetIndexShown), (pageOffsetIndexShown + pokemonsPerPage))
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
