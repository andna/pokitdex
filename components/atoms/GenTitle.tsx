import React from "react";
import {Typography} from "@mui/material";
import {getTitle} from "../../services/pokemonGetter";



const styles = {
    title: {
        width: '100%',
        background: 'linear-gradient(180deg, rgba(188, 81, 103, .3) 1%, transparent 80%)',
        borderRadius: '20px 20px 0 0',
        textAlign: 'center',
        padding: 2,
        fontWeight: 800,
        margin: '40px 8px 15px 24px',
        color: '#aa5b5b'
    },
}

type Props = {
    title:string
}

const GenTitle: React.FC<Props> = ({ title }) => {
    return  <Typography variant={'h6'}
                        sx={styles.title}
    >
        { title }
    </Typography>
}

export default GenTitle;
