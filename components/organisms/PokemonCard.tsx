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
import Avatar from "../molecules/Avatar";
import PokeIndex from "../atoms/PokeIndex";
import {ChevronRight, Close, Delete, DeleteOutline} from "@mui/icons-material";
import PageContent from "./PageContent";
import {useRouter} from "next/router";

type Props = {
    pokemonName: string;
    isFirstOfPage?: boolean;
    isPage?: boolean;
    isCurrentlySearching?: boolean;
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
    title: {
        width: '100%',
        background: 'linear-gradient(180deg, #ffffff33 1%, transparent 80%)',
        borderRadius: '20px 20px 0 0',
        textAlign: 'center',
        padding: 2,
        fontWeight: 800,
        margin: '40px 0 15px 16px'
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
                                          isCurrentlySearching = false}) => {

    const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>();
    const [startedDelete, setStartedDelete] = useState<boolean>();

    useEffect(() => {
        fetchPokemonData();
    }, [])

    const fetchPokemonData = async () => {
        setPokemonInfo(await loadPokemonByApi(pokemonName, isPage));
    };

    const router = useRouter();

    return <>
        {!isCurrentlySearching && !isPage && pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, true)) &&
        <Typography variant={'h6'}
                    sx={styles.title}
        >
           { getTitle(pokemonInfo.id, true) || getTitle(pokemonInfo.id, false) }
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
                            <Skeleton variant="rectangular" width={'100%'} height={isPage ? 800 : 104} />
                            <p style={styles.pokemonSkeleton}>{pokemonName}</p>
                        </div>

                    }
                </Card>
            </Link>
        </Grid>
    </>
}

export default PokemonCard;
