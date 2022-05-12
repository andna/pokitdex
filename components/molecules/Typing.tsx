import React from "react";
import {Type} from "../../types/Pokemon";
import colors from "../atoms/colors";
import {styles} from "./StylesMolecules";

type Props = {
    typing: Type;
}

const Typing: React.FC<Props> = ({ typing }) => {

    const typeColors : any = colors.types
    const StyledChip = styles.Typing.Chip(typeColors[typing.type.name] );;

    return <StyledChip label={typing.type.name} />
}

export default Typing;
