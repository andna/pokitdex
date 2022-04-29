import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Card, Button, CardActions,
    CardContent, Grid, Typography, Skeleton,
} from "@mui/material";
import Link from 'next/link'
import {getTitle, loadPokemonByApi} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";
import Naming from "../molecules/Naming";
import Avatar from "../molecules/Avatar";
import PokeIndex from "../atoms/PokeIndex";
import {ChevronRight} from "@mui/icons-material";
import PageContent from "./PageContent";

type Props = {
    pokemonName: string;
    isFirstOfPage?: boolean;
    isPage?: boolean;
}

const styles = {
    card: {
        width: 345,
        marginBottom: 2,
        overflow: 'unset',
    },
    pageCard:{
        width: 800,
        maxWidth: 'calc(100vw - 42px)',
    },
    clickeable: {
        cursor: 'pointer !important',
        "&:hover": {
            filter: 'brightness(1.1)'
        }
    },
    externalPadding: {
        padding: '0.1em !important',
    },
    internalPadding: {
        padding: '1em',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        position: 'relative' as 'relative'
    },
    title: {
        width: '100%',
        background: 'linear-gradient(180deg, #ffffff33 1%, transparent 80%)',
        borderRadius: '20px 20px 0 0',
        textAlign: 'center',
        padding: 2,
        fontWeight: 800,
        margin: '40px 0 15px'
    },
    nameContainer: {
        flex: 1
    },
    chevron: {
        justifySelf: 'center'
    },
    pageContent: {
        width: '100%'
    }
}



const PokemonCard: React.FC<Props> = ({ pokemonName,
                                          isFirstOfPage = false,
                                          isPage = false  }) => {

    const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>();

    useEffect(() => {
        fetchPokemonData();
    }, [])

    const fetchPokemonData = async () => {
        setPokemonInfo(await loadPokemonByApi(pokemonName));
    };


    return <>
        {!isPage && pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, true)) &&
        <Typography variant={'h6'}
                    sx={styles.title}
        >
           { getTitle(pokemonInfo.id, !isFirstOfPage) }
        </Typography>}
        <Grid key={pokemonName} item>

            <Link href={isPage ? 'javascript:void(0)' : `/${pokemonName}`}>
                <Card sx={{...styles.card, ...(isPage ? styles.pageCard: styles.clickeable)}}>
                    {pokemonInfo ?
                            <>
                                <CardContent sx={styles.externalPadding}>
                                    <div style={styles.cardContent}>
                                        <div>
                                            <Avatar pokemonName={pokemonName}
                                                    isPage={isPage}
                                                    sprites={pokemonInfo?.sprites} />
                                            <PokeIndex pokemonIndex={pokemonInfo.id}
                                                       isPage={isPage} />
                                        </div>
                                        <div style={styles.nameContainer}>
                                            <Naming pokemon={pokemonInfo}/>
                                            <div>
                                                {pokemonInfo?.types?.map((type : Type) => {
                                                    return <Typing key={type.slot} typing={type}/>
                                                })}
                                            </div>
                                            {isPage &&
                                                <Typography  variant={'caption'} sx={{opacity: 0.5}}>
                                                    <b>{ getTitle(pokemonInfo.id) }</b> group.
                                                </Typography>
                                            }
                                        </div>
                                        {!isPage && <ChevronRight/>}
                                    </div>

                                    {isPage && <div style={styles.internalPadding}>
                                        <PageContent pokemon={pokemonInfo}/>
                                    </div>}
                                </CardContent>


                            </>
                    :
                        <Skeleton variant="rectangular" width={210} height={110} />
                    }
                </Card>
            </Link>
        </Grid>
    </>
}

export default PokemonCard;
