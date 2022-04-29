import React from "react";
import { Typography } from "@mui/material";

const styles = {
    indexNumber: {
        fontWeight: 300,
        lineHeight: 0.1,
        fontFamily: 'monospace',
        letterSpacing: '0.3em',
        position: 'absolute',
        left: 2,
        bottom: 8,
        opacity: .5,
        padding: 1
    },
    indexNumberPage: {
        left: 'initial',
        bottom: 'initial',
        top: '4.2vw'
    },
    identifier: {
        letterSpacing: 0
    }
}
type Props = {
    pokemonIndex: number;
    isPage: boolean;
}

const myformat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 0
});

const numberWhereFormsStart = 10000;

const PokeIndex: React.FC<Props> = ({ pokemonIndex, isPage = false }) => {
    return <Typography variant={'caption'}
                           sx={{...styles.indexNumber,
                               ...(isPage ? styles.indexNumberPage : null)}}>

        {pokemonIndex < 0 ?
            <>
                <span style={styles.identifier}>Custom </span>
                #{Math.abs(pokemonIndex)}
            </>
            :
            (pokemonIndex > numberWhereFormsStart ?
                <>
                    <span style={styles.identifier}>Form </span>
                    #{myformat.format(pokemonIndex - numberWhereFormsStart)}
                </>
                :
                <>#{myformat.format(pokemonIndex)}</>
            )
        }

    </Typography>
}

export default PokeIndex;
