import React, {useState} from "react";
import { Avatar as AvatarMui} from "@mui/material";
import colors from "../../atoms/colors";
import {Sprites} from "../../../types/Pokemon";
import cssStyles from './avatar.module.css'

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
        filter: 'drop-shadow(rgba(0,0,0,.3) 4px 8px 8px)',
        transition: '0.2s',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0)',
        overflow: 'visible'
    },
    bigImage: {
        height: '400px',
        width:'400px',
        maxHeight: '45vw',
        maxWidth: '45vw',
    },
    errorImage: {
        transform: 'scale(0.8)',
        filter: 'grayscale(0.9) brightness(1.4)'
    }
}
type Props = {
    pokemonName: string;
    sprites: Sprites;
    isPage: boolean;
}



const Avatar: React.FC<Props> = ({ pokemonName, sprites, isPage }) => {

    const front = sprites?.front_default;
    const frontShiny = sprites?.front_shiny;
    const frontHome = sprites?.other?.home?.front_default;
    const official = sprites?.other && sprites.other["official-artwork"]?.front_default;
    const gen8 = sprites?.versions &&  sprites.versions["generation-viii"]?.icons?.front_default;

    const altImgForErrors = '/pokitdex.svg';

    const [image, setImage] =  useState<string>(isPage
            ?
            (official || frontHome || front || frontShiny || gen8)
            :
            (front || frontShiny || official || frontHome || gen8)
    );

    const [isLoading, setIsLoading] = useState<boolean>(true);

    return  <img
        className={isLoading ? cssStyles['loading-image'] : ""}
        onError={() => { setImage(altImgForErrors)}}
        onLoad={() => {setIsLoading(false)}}
        src={image ? image : altImgForErrors} alt={pokemonName}
        style={{...styles.image,
            ...(isPage ? styles.bigImage : null),
            ...((!image || image === altImgForErrors) ? styles.errorImage : null)}}/>
}

export default Avatar;
