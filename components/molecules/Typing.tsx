import React from "react";
import {Type} from "../../types/Pokemon";
import {
    Chip
} from "@mui/material";
import colors from "../atoms/colors";

const styles = {
    chip: {
        textTransform: 'uppercase',
        marginRight: 1,
        fontSize: 10,
        fontFamily: 'system-ui',
        letterSpacing: '-0.3px',
        fontWeight: 800
    }
}
type Props = {
    typing: Type;
}

const Typing: React.FC<Props> = ({ typing }) => {
    return <Chip
                sx={{...styles.chip, background: colors.types[typing.type.name] }}
                label={typing.type.name} />
}

export default Typing;