import React from "react";
import {AbilityObject} from "../../types/Pokemon";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {styles} from "./StylesAtoms";

type Props = {
    data: AbilityObject;
}
const styled = styles.LiAbility;

const LiAbility: React.FC<Props> = ({ data }) => {
    return <li key={data.ability.name}>

        <styled.Ability>
            {changeDashForSpace(data.ability.name)}
        </styled.Ability>
        <styled.isHidden><small>
            {data.is_hidden && ' Is Hidden'}
        </small></styled.isHidden>
    </li>
}

export default LiAbility;
