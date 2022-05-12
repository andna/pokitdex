import React, {useEffect, useState} from "react";
import {Pokemon} from "../../types/Pokemon";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {styles} from "./StylesMolecules";


type Props = {
    pokemon: Pokemon;
}

const styled = styles.Naming;


const Naming: React.FC<Props> = ({ pokemon }) => {

    const [fixedSubName, setFixedSubName] = useState<string>("");

    useEffect(() => {
        const speciesName = pokemon?.species?.name;
        if(speciesName !== pokemon.name){
            setFixedSubName(changeDashForSpace(pokemon.name.replace(speciesName, "")));
        }
    }, []);

    return <>
            <styled.NameContainer>

                <styled.Species variant={'h6'} color={"default"}>
                    {pokemon?.species?.name}
                </styled.Species>

                {fixedSubName &&
                    <styled.FixedSubName variant={'caption'}>
                        {fixedSubName}
                    </styled.FixedSubName>}
            </styled.NameContainer>
        </>
}

export default Naming;
