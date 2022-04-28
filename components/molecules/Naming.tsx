import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import {
    Chip, Typography
} from "@mui/material";
import colors from "../atoms/colors";


type Props = {
    pokemon: Pokemon;
}


const styles = {
    nameContainer: {
        flex: 1,
        paddingLeft: 8
    },
    species: {
        fontWeight: 800,
        lineHeight: 2,
        textTransform: 'capitalize'
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
    indexNumber: {
        fontWeight: 300,
        lineHeight: 0.1,
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        alignSelf: 'center'
    }
}

const myformat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 0
});

const changeDashForSpace = (stringToChange : string) => {
    return stringToChange.split("-").join(" ");
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
            <Typography variant={'caption'}
                        sx={styles.indexNumber}>
                {pokemon?.id > 1000 ?

                    <>#F{myformat.format(pokemon?.id - 10000)}</>

                    :
                    <>#{myformat.format(pokemon?.id)}</>

                }
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
        </>
}

export default Naming;