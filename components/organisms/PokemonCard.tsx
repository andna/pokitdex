import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Card, Button, CardActions,
    CardContent, Avatar, Grid, Typography,
} from "@mui/material";
import Link from 'next/link'
import colors from "../atoms/colors";
import {loadPokemonByApi} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";
import Naming from "../molecules/Naming";

type Props = {
    pokemonName: string;
}

const styles = {
    card: {width: 350, marginBottom: 2},
    cardContent: {
        display: 'flex',
        alignItems: 'start',
        flex: 1,
        justifyContent: 'space-between',
    },
    avatar: {
        bgcolor: colors.avatarBg,
        boxShadow: '0 3px 6px rgb(0 0 0 / 30%)',
    },
    buttonContainer: {
        marginLeft: "auto",
        display: 'flex',
        alignItems: 'center'
    },
}


const PokemonCard: React.FC<Props> = ({ pokemonName }) => {

    const [pokemonInfo, setPokemonInfo] = useState<Pokemon>(null);

    useEffect(() => {
        fetchPokemonData();
    }, [])

    const fetchPokemonData = async () => {
        setPokemonInfo(await loadPokemonByApi(pokemonName));
    };



    return <Grid key={pokemonName} item>
            {false && pokemonInfo &&
            <Typography variant={'h6'}
                        color={"secondary"}
            >
                Generation II
            </Typography>}
            <Card sx={styles.card}>
                {pokemonInfo ?
                            <>
                            <CardContent sx={styles.cardContent}>

                                <Naming pokemon={pokemonInfo}/>
                                <Avatar alt={pokemonName}
                                        sx={styles.avatar}
                                >
                                    {pokemonName.slice(0, 2).toUpperCase()}
                                </Avatar>

                            </CardContent>

                            <CardActions>
                                <div>
                                    {pokemonInfo?.types?.map((type : Type) => {
                                        return <Typing key={type.slot} typing={type}/>
                                    })}
                                </div>

                                <div style={styles.buttonContainer}>

                                    <Link href={`/${pokemonName}`}>
                                        <Button variant="contained"
                                        >
                                            {'>'}
                                        </Button>
                                    </Link>
                                </div>
                            </CardActions>
                        </>
                :
                    <>Skeleton</>
                }
                </Card>
            </Grid>
}

export default PokemonCard;