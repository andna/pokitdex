import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Card,
    CardContent, Grid, Typography, Skeleton, Tooltip,
} from "@mui/material";
import Link from 'next/link'
import {getTitle, loadPokemonByApi, deleteCustom} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";
import Naming from "../molecules/Naming";
import Avatar from "../molecules/Avatar/Avatar";
import PokeIndex from "../atoms/PokeIndex";
import {ChevronRight, Close, Delete, DeleteOutline} from "@mui/icons-material";
import PageContent from "./PageContent";
import {useRouter} from "next/router";
import GenTitle from "../atoms/GenTitle";

type Props = {
    pokemonName: string;
    isFirstOfPage?: boolean;
    isPage?: boolean;
    isCurrentlySearching?: boolean;
    clickedOnPokemon?: (pokeName: string) => void;
}

const styles = {
    card: {
        width: 345,
        marginBottom: 2,
        overflow: 'unset',
        position: 'relative' as 'relative'
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
    nameContainer: {
        flex: 1
    },
    chevron: {
        justifySelf: 'center'
    },
    pageContent: {
        width: '100%'
    },
    deleters: {
        marginRight: 1,
        cursor: 'pointer'
    },
    deleterContainer: {
        opacity: 0.6,
        fontSize: 14,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '-10px 0 15px',
        color: '#eb7272'
    },
    pokemonSkeletonContainer:{
        position: 'relative' as 'relative'

    },
    pokemonSkeleton: {
        position: 'absolute' as 'absolute',
        width: '100%',
        textAlign: 'center' as 'center',
        zIndex: 1,
        textTransform: 'capitalize' as 'capitalize',
        bottom: 'calc(50% - 20px)',
        fontWeight: 300,
        fontSize: '70%'
    }
}



const PokemonCard: React.FC<Props> = ({ pokemonName,
                                          isFirstOfPage = false,
                                          isPage = false,
                                          isCurrentlySearching = false,
                                          clickedOnPokemon = null}) => {

    const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>();
    const [startedDelete, setStartedDelete] = useState<boolean>();

    useEffect(() => {
        setPokemonInfo(null);
        fetchPokemonData();
    }, [pokemonName])

    const fetchPokemonData = async () => {
        setPokemonInfo(await loadPokemonByApi(pokemonName, isPage));
    };

    const router = useRouter();

    return <>
        {!isCurrentlySearching && !isPage && pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, true)) &&
            <GenTitle title={(getTitle(pokemonInfo.id, true) || getTitle(pokemonInfo.id, false) )}/>
        }
        <Grid key={pokemonName} item>
            <Card onClick={() => { !isPage && clickedOnPokemon && clickedOnPokemon(pokemonName)}}
                sx={{...styles.card, ...(isPage ? styles.pageCard: styles.clickeable)}}>
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
                                    {pokemonInfo.id < 0 &&
                                    <div style={styles.deleterContainer}>
                                        {startedDelete ? <>
                                                <Tooltip title="Are you sure about Deleting them?">
                                                   <Delete sx={styles.deleters} onClick={() => {
                                                       router.push('/');
                                                       deleteCustom(pokemonName);
                                                   }}/>
                                                </Tooltip>
                                                <span>¿Confirm Delete?</span>
                                                <Tooltip title="Don't delete">
                                                    <Close sx={styles.deleters} onClick={() => setStartedDelete(false)}/>
                                                </Tooltip>
                                            </>
                                            :
                                            <Tooltip title="Delete this hero?">
                                                <> Delete Custom <DeleteOutline sx={styles.deleters} onClick={() => setStartedDelete(true)}/></>
                                            </Tooltip>
                                        }
                                    </div>
                                    }
                                    <PageContent pokemon={pokemonInfo}/>
                                </div>}
                            </CardContent>


                        </>
                :
                    <div style={styles.pokemonSkeletonContainer}>
                        <Skeleton variant="rectangular" width={'100%'} height={isPage ? 940 : 104} />
                        <p style={styles.pokemonSkeleton}>{pokemonName}</p>
                    </div>

                }
            </Card>
        </Grid>
    </>
}

export default PokemonCard;
