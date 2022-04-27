import React from "react";
import { Pokemon } from "../../types/Pokemon";
import {
    Card, Button, CardActions,
    CardContent, Typography, Avatar, Grid,
} from "@mui/material";
import Link from 'next/link'
import colors from "../atoms/colors";

type Props = {
    pokemon: Pokemon;
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
        name: {
            fontWeight: 800,
            lineHeight: 2
        },
        nameSmall: {
            fontWeight: 800,
            lineHeight: 2,
            fontSize: 14
        },
        subName: {
            fontWeight: 300,
            lineHeight: 0.1,
            position: 'relative',
            marginBottom: -4,
            display: 'block',
            top: 0,
        },
        buttonContainer: {
            marginLeft: "auto",
            display: 'flex',
            alignItems: 'center'
        }
    }

    return <Grid key={pokemon.name} item>
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
                <Avatar alt={pokemon.name}
                        sx={styles.avatar}
                >
                    {pokemon.name.slice(0, 2)}
                </Avatar>
                <div style={styles.nameContainer}>

                    <Typography variant={'h6'}
                                sx={styles.name}
                                color={"default"}
                    >
                        {pokemon.name}
                    </Typography>
                </div>

            </CardContent>

            <CardActions>
                <div>
                    info
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