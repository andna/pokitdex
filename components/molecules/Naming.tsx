import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import {
    Chip, Typography
} from "@mui/material";
import colors from "../atoms/colors";
import {changeDashForSpace} from "../../services/pokemonGetter";


type Props = {
    pokemon: Pokemon;
}


const styles = {
    nameContainer: {
        flex: 1,
        paddingLeft: 8
    },
    species: {
        fontWeight: 700,
        lineHeight: 2,
        textTransform: 'capitalize'
    },
    fixedSubName: {
        fontWeight: 300,
        lineHeight: 0.1,
        position: 'relative',
        marginBottom: 1.6,
        display: 'block',
        top: 0,
        textTransform: 'capitalize'
    },
}


const Naming: React.FC<Props> = ({ pokemon }) => {

    const [fixedSubName, setFixedSubName] = useState<string>("");

    useEffect(() => {
        const speciesName = pokemon?.species?.name;
        if(speciesName !== pokemon.name){
            setFixedSubName(changeDashForSpace(pokemon.name.replace(speciesName, "")));
        }
    }, []);

    return <>
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
        </>
}

export default Naming;
