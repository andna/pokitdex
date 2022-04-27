import React from "react";
import {Type} from "../../types/Pokemon";
import {
    Chip
} from "@mui/material";


type Props = {
    typing: Type;
}

const Typing: React.FC<Props> = ({ typing }) => {
    return <Chip label={typing.type.name} />
}

export default Typing;