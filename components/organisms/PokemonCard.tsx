import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Card, Button, CardActions,
    CardContent, Grid, Typography, Skeleton,
} from "@mui/material";
import Link from 'next/link'
import {loadPokemonByApi} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";
import Naming from "../molecules/Naming";
import Avatar from "../molecules/Avatar";
import PokeIndex from "../atoms/PokeIndex";
import {ChevronRight} from "@mui/icons-material";

type Props = {
    pokemonName: string;
    isFirstOfPage?: boolean;
}

const styles = {
    card: {
        width: 350,
        marginBottom: 2,
        overflow: 'unset',
        cursor: 'pointer !important',
        "&:hover": {
            filter: 'brightness(1.1)'
        }
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        padding: '0.1em !important',
        position: 'relative'
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
    }
}

const compare = (pokemonId: number, specificIndex: number, comparator: string) => {
    switch (comparator){
        case '>':
            return pokemonId > specificIndex;
        case '===':
            return pokemonId === specificIndex;
    }
}

const getTitle = (index: number, comparator: string) => {
    const positions = [
        {pos: 0, title: '1st Gen'},
        {pos: 152, title: '2nd Gen'},
        {pos: 252, title: '3rd Gen'},
        {pos: 387, title: '4th Gen'},
        {pos: 494, title: '5th Gen'},
        {pos: 650, title: '6th Gen'},
        {pos: 722, title: '7th Gen'},
        {pos: 810, title: '8th Gen'},
        {pos: 10001, title: 'Forms'},
        {pos: 10033, title: 'Mega Evolutions'},
        {pos: 10080, title: 'Other Forms'},
        {pos: 10195, title: 'Gmax Forms'},
    ];
    let foundTitle = '';
    positions.forEach(position => {
        if(compare(index, position.pos, comparator)){
            foundTitle = position.title;
        }
    });
    return foundTitle;
}

const PokemonCard: React.FC<Props> = ({ pokemonName, isFirstOfPage = false }) => {

    const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>();

    useEffect(() => {
        fetchPokemonData();
    }, [])

    const fetchPokemonData = async () => {
        setPokemonInfo(await loadPokemonByApi(pokemonName));
    };


    return <>
        {pokemonInfo && (isFirstOfPage || getTitle(pokemonInfo.id, '===')) &&
        <Typography variant={'h6'}
                    sx={styles.title}
        >
           { getTitle(pokemonInfo.id, isFirstOfPage ? '>' : '===') }
        </Typography>}
        <Grid key={pokemonName} item>

            <Link href={`/${pokemonName}`}>
                <Card sx={styles.card}>
                    {pokemonInfo ?
                            <>
                                <CardContent sx={styles.cardContent}>
                                    <div>
                                        <Avatar pokemonName={pokemonName}
                                                sprites={pokemonInfo?.sprites} />
                                        <PokeIndex pokemonIndex={pokemonInfo.id} />


                                    </div>
                                    <div style={styles.nameContainer}>
                                        <Naming pokemon={pokemonInfo}/>
                                        <div>
                                            {pokemonInfo?.types?.map((type : Type) => {
                                                return <Typing key={type.slot} typing={type}/>
                                            })}
                                        </div>
                                    </div>
                                    <ChevronRight />
                                </CardContent>


                            </>
                    :
                        <Skeleton variant="rectangular" width={210} height={130} />
                    }
                </Card>
            </Link>
        </Grid>
    </>
}

export default PokemonCard;
