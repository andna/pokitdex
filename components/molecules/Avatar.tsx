import React, {useState} from "react";
import {Sprites} from "../../types/Pokemon";
import {styles} from "./StylesMolecules";

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

    const StyledImg = styles.Avatar.Img({
        isBig: isPage,
        isLoading: isLoading,
        isError: (!image || image === altImgForErrors)});

    return  <StyledImg
        onError={() => { setImage(altImgForErrors)}}
        onLoad={() => {setIsLoading(false)}}
        src={image ? image : altImgForErrors} alt={pokemonName}/>
}

export default Avatar;
