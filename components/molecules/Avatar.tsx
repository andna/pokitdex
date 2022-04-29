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
    },
    bigImage: {
        height: '400px',
        width:'400px',
        maxHeight: '45vw',
        maxWidth: '45vw',
    }
}
type Props = {
    pokemonName: string;
    sprites: Sprites;
    isPage: boolean;
}



const Avatar: React.FC<Props> = ({ pokemonName, sprites, isPage }) => {

    const front = sprites.front_default;
    const frontShiny = sprites.front_shiny;
    const frontHome = sprites.other?.home?.front_default;
    const official = sprites.other["official-artwork"]?.front_default;
    const gen8 = sprites.versions["generation-viii"]?.icons?.front_default;

    const image =  isPage
            ?
            (official || frontHome || front || frontShiny || gen8)
            :
            (front || frontShiny || official || frontHome || gen8)
    ;

    return   <>
        {image ?
            <img src={image} alt={pokemonName} style={{...styles.image, ...(isPage ? styles.bigImage : null)}}/>
            :
            <AvatarMui alt={pokemonName} sx={styles.avatar} >
                {pokemonName.slice(0, 2).toUpperCase()}
            </AvatarMui>
        }
        </>
}

export default Avatar;
