import React, {useEffect, useState} from "react";
import { Pokemon, Type } from "../../types/Pokemon";
import {
    Card, Button, CardActions,
    CardContent, Typography, Avatar, Grid,
} from "@mui/material";
import Link from 'next/link'
import colors from "../atoms/colors";
import {loadPokemonByApi} from "../../services/pokemonGetter";
import Typing from "../molecules/Typing";

type Props = {
    pokemon: Pokemon;
}


const myformat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 0
});

const changeDashForSpace = (stringToChange : string) => {
    return stringToChange.split("-").join(" ");
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {

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
        nameContainer: {
            flex: 1,
            paddingLeft: 8
        },
        species: {
            fontWeight: 800,
            lineHeight: 2,
            textTransform: 'capitalize'
        },
        nameSmall: {
            fontWeight: 800,
            lineHeight: 2,
            fontSize: 14
        },
        fixedSubName: {
            fontWeight: 300,
            lineHeight: 0.1,
            position: 'relative',
            marginBottom: -4,
            display: 'block',
            top: 0,
            textTransform: 'capitalize'
        },
        buttonContainer: {
            marginLeft: "auto",
            display: 'flex',
            alignItems: 'center'
        },
        indexNumber: {
            fontWeight: 300,
            lineHeight: 0.1,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            alignSelf: 'center'
        }
    }

    const [fixedSubName, setFixedSubName] = useState<string>("");

    useEffect(() => {
        let localPokemonInfo = JSON.parse(localStorage.getItem(`pokemon/${pokemon.name}`) as string);
        if(!localPokemonInfo){
            localPokemonInfo = loadPokemonByApi(pokemon.name);
        }
        if(localPokemonInfo.species
            && localPokemonInfo.species.name){
            const speciesName = localPokemonInfo.species.name;
            if(speciesName !== pokemon.name){
                setFixedSubName(changeDashForSpace(pokemon.name.replace(speciesName, "")));
            }
        }
       // setPokemonInfo(localPokemonInfo);

        console.log('eee',localPokemonInfo);
    }, [])

    return <Grid key={pokemon.name} item>
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>

                <Typography variant={'caption'}
                            sx={styles.indexNumber}>
                    #{myformat.format(pokemon?.id)}
                </Typography>
                <div style={styles.nameContainer}>

                    <Typography variant={'h6'}
                                sx={styles.species}
                                color={"default"}
                    >
                        {pokemon?.species?.name}
                    </Typography>

                    {fixedSubName &&
                    <Typography variant={'caption'}
                                sx={styles.fixedSubName}>
                        {fixedSubName}
                    </Typography>}
                </div>
                <Avatar alt={pokemon.name}
                        sx={styles.avatar}
                >
                    {pokemon.name.slice(0, 2)}
                </Avatar>

            </CardContent>

            <CardActions>
                <div>
                    {pokemon?.types?.map((type : Type) => {
                        return <Typing key={type.slot} typing={type}/>
                    })}
                </div>

                <div style={styles.buttonContainer}>

                    <Link href={`/${pokemon.name}`}>
                        <Button variant="contained"
                        >
                            {'>'}
                        </Button>
                    </Link>
                </div>
            </CardActions>

        </Card>
    </Grid>
}

export default PokemonCard;