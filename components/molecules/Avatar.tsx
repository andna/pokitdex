import React from "react";
import { Avatar as AvatarMui} from "@mui/material";
import colors from "../atoms/colors";
import {Sprites} from "../../types/Pokemon";

const styles = {
    avatar: {
        bgcolor: colors.avatarBg,
    },
    image: {
        height: '96px',
        width:'96px',
        position: 'relative' as 'relative',
        left: '-20px',
        top: '-20px',
        filter: 'drop-shadow(rgba(0,0,0,.3) 4px 8px 8px)'
    }
}
type Props = {
    pokemonName: string;
    sprites: Sprites;
}



const Avatar: React.FC<Props> = ({ pokemonName, sprites }) => {

    const image = sprites.front_default
        ||
        sprites.front_shiny
        ||
        sprites.other?.home?.front_default
        ||
        sprites.other["official-artwork"]?.front_default
        ||
        sprites.other?.home?.front_default
        ||
        sprites.versions["generation-viii"]?.icons?.front_default;
    ;

    return   <>
        {image ?
            <img src={image} alt={pokemonName} style={styles.image}/>
            :
            <AvatarMui alt={pokemonName} sx={styles.avatar} >
                {pokemonName.slice(0, 2).toUpperCase()}
            </AvatarMui>
        }
        </>
}

export default Avatar;
