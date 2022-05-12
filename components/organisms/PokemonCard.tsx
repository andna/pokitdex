import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Grid, Typography, Skeleton, Tooltip, Card,
} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
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
    card: {
        width: 345,
        marginBottom: 2,
        overflow: 'unset',
        position: 'relative' as 'relative'
    },
    pageCard: {
        width: 800,
        maxWidth: 'calc(100vw - 42px)',
    },
    clickeable: {
        cursor: 'pointer !important',
        "&:hover": {
            filter: 'brightness(1.1)'
        }
    },
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

    return <>
        {!isCurrentlySearching && !isPage && pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, true)) &&
            <GenTitle title={(getTitle(pokemonInfo.id, true) || getTitle(pokemonInfo.id, false) )}/>
        }
        <Grid key={pokemonName} item>

            <Link href={isPage ? 'javascript:void(0)' : `/${pokemonName}`}>
                <Card sx={{...styles2.card, ...(isPage ? styles2.pageCard: styles2.clickeable)}}>
                    {pokemonInfo ?
                            <>
                                <styled.ExternalPadding>
                                    <styled.CardContent>
                                        <div>
                                            <Avatar pokemonName={pokemonName}
                                                    isPage={isPage}
                                                    sprites={pokemonInfo?.sprites} />
                                            <PokeIndex pokemonIndex={pokemonInfo.id}
                                                       isPage={isPage} />
                                        </div>
                                        <styled.NameContainer>
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
                                        </styled.NameContainer>
                                        {!isPage && <ChevronRight/>}
                                    </styled.CardContent>

                                    {isPage && <styled.InternalPadding>
                                        {pokemonInfo.id < 0 &&
                                        <styled.deleterContainer>
                                            {startedDelete ? <>
                                                    <Tooltip title="Are you sure about Deleting them?">
                                                       <styled.Delete onClick={() => {
                                                           router.push('/');
                                                           deleteCustom(pokemonName);
                                                       }}/>
                                                    </Tooltip>
                                                    <span>¿Confirm Delete?</span>
                                                    <Tooltip title="Don't delete">
                                                        <styled.Close onClick={() => setStartedDelete(false)}/>
                                                    </Tooltip>
                                                </>
                                                :
                                                <Tooltip title="Delete this hero?">
                                                    <> Delete Custom <styled.DeleteOutline onClick={() => setStartedDelete(true)}/></>
                                                </Tooltip>
                                            }
                                        </styled.deleterContainer>
                                        }
                                        <PageContent pokemon={pokemonInfo}/>
                                    </styled.InternalPadding>}
                                </styled.ExternalPadding>


                            </>
                    :
                        <styled.SkeletonContainer>
                            <Skeleton variant="rectangular" width={'100%'} height={isPage ? 940 : 104} />
                            <styled.Skeleton>{pokemonName}</styled.Skeleton>
                        </styled.SkeletonContainer>

                    }
                </Card>
            </Link>
        </Grid>
    </>
}

export default PokemonCard;
