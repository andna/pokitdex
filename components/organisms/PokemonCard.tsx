import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {Card, CardContent, Grid, Typography, Skeleton, Tooltip,
} from "@mui/material";
import {ChevronRight, Close, Delete, DeleteOutline} from "@mui/icons-material";
import Link from 'next/link'
import {getTitle, loadPokemonByApi, deleteCustom} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";
import Naming from "../molecules/Naming";
import Avatar from "../molecules/Avatar";
import PokeIndex from "../atoms/PokeIndex";
import PageContent from "./PageContent";
import {useRouter} from "next/router";
import GenTitle from "../atoms/GenTitle";
import {styles} from "./StylesOrganisms";

type Props = {
    pokemonName: string;
    isFirstOfPage?: boolean;
    isPage?: boolean;
    isCurrentlySearching?: boolean;
}

const styles2 = {
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

const styled = styles.PokemonCard;

const PokemonCard: React.FC<Props> = ({ pokemonName,
                                          isFirstOfPage = false,
                                          isPage = false,
                                          isCurrentlySearching = false}) => {

    const [hoveringCard, setHoveringCard] = useState<boolean>(false);
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

    const StyledCard = styled.Card({isPage: isPage, isHovered: hoveringCard})

    return <>
        {!isCurrentlySearching && !isPage && pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, true)) &&
            <GenTitle title={(getTitle(pokemonInfo.id, true) || getTitle(pokemonInfo.id, false) )}/>
        }
        <Grid key={pokemonName} item>

            <Link href={isPage ? 'javascript:void(0)' : `/${pokemonName}`}>
                <StyledCard
                    onMouseEnter={() => setHoveringCard(true)}
                    onMouseLeave={() => setHoveringCard(false)}>
                    {pokemonInfo ?
                            <>
                                <CardContent sx={styles2.externalPadding}>
                                    <div style={styles2.cardContent}>
                                        <div>
                                            <Avatar pokemonName={pokemonName}
                                                    isPage={isPage}
                                                    sprites={pokemonInfo?.sprites} />
                                            <PokeIndex pokemonIndex={pokemonInfo.id}
                                                       isPage={isPage} />
                                        </div>
                                        <div style={styles2.nameContainer}>
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

                                    {isPage && <div style={styles2.internalPadding}>
                                        {pokemonInfo.id < 0 &&
                                        <div style={styles2.deleterContainer}>
                                            {startedDelete ? <>
                                                    <Tooltip title="Are you sure about Deleting them?">
                                                       <Delete sx={styles2.deleters} onClick={() => {
                                                           router.push('/');
                                                           deleteCustom(pokemonName);
                                                       }}/>
                                                    </Tooltip>
                                                    <span>¿Confirm Delete?</span>
                                                    <Tooltip title="Don't delete">
                                                        <Close sx={styles2.deleters} onClick={() => setStartedDelete(false)}/>
                                                    </Tooltip>
                                                </>
                                                :
                                                <Tooltip title="Delete this hero?">
                                                    <> Delete Custom <DeleteOutline sx={styles2.deleters} onClick={() => setStartedDelete(true)}/></>
                                                </Tooltip>
                                            }
                                        </div>
                                        }
                                        <PageContent pokemon={pokemonInfo}/>
                                    </div>}
                                </CardContent>


                            </>
                    :
                        <div style={styles2.pokemonSkeletonContainer}>
                            <Skeleton variant="rectangular" width={'100%'} height={isPage ? 940 : 104} />
                            <p style={styles2.pokemonSkeleton}>{pokemonName}</p>
                        </div>

                    }
                </StyledCard>
            </Link>
        </Grid>
    </>
}

export default PokemonCard;
