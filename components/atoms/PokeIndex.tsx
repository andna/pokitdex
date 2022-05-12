import React from "react";
import {styles} from "./StylesAtoms";

type Props = {
    pokemonIndex: number;
    isPage: boolean;
}

const myformat = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 3,
    minimumFractionDigits: 0
});


const numberWhereFormsStart = 10000;

const styled = styles.PokeIndex;

const PokeIndex: React.FC<Props> = ({ pokemonIndex, isPage = false }) => {

    const StyledIndexNumber = styled.IndexNumber(isPage);

    return <StyledIndexNumber variant={'caption'}>

        {pokemonIndex < 0 ?
            <>
                <styled.Identifier>Custom </styled.Identifier>
                #{Math.abs(pokemonIndex)}
            </>
            :
            (pokemonIndex > numberWhereFormsStart ?
                <>
                    <styled.Identifier>Form </styled.Identifier>
                    #{myformat.format(pokemonIndex - numberWhereFormsStart)}
                </>
                :
                <>#{myformat.format(pokemonIndex)}</>
            )
        }

    </StyledIndexNumber>
}

export default PokeIndex;
