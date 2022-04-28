import React from "react";
import {Type} from "../../types/Pokemon";
import {
    Chip, Typography
} from "@mui/material";
import colors from "../atoms/colors";

const styles = {
    indexNumber: {
        fontWeight: 300,
        lineHeight: 0.1,
        fontFamily: 'monospace',
        letterSpacing: '0.3em',
        position: 'absolute',
        left: 13,
        bottom: 17,
        opacity: .5
    },
    identifier: {
        letterSpacing: 0
    }
}
type Props = {
    pokemonIndex: number;
}

const myformat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 0
});

const numberWhereFormsStart = 10000;

const PokeIndex: React.FC<Props> = ({ pokemonIndex }) => {
    return <Typography variant={'caption'}
                           sx={styles.indexNumber}>
        {pokemonIndex > numberWhereFormsStart ?
            <>
                <span style={styles.identifier}>Form </span>
                #{myformat.format(pokemonIndex - numberWhereFormsStart)}
            </>
            :
            <>#{myformat.format(pokemonIndex)}</>
        }
    </Typography>
}

export default PokeIndex;
