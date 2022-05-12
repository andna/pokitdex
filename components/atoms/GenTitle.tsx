import React from "react";
import {styles} from "./StylesAtoms";

const StyledGenTitle = styles.GenTitle.Title;

type Props = {
    title:string
}

const GenTitle: React.FC<Props> = ({ title }) => {
    return  <StyledGenTitle variant={'h6'} >
        { title }
    </StyledGenTitle>
}

export default GenTitle;
