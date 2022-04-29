import React from "react";
import {AbilityObject} from "../../types/Pokemon";
import colors from "../atoms/colors";
import {changeDashForSpace} from "../../services/pokemonGetter";

const styles = {
    capitalize: {
        textTransform: 'capitalize' as 'capitalize',
    },
}
type Props = {
    data: AbilityObject;
}

const LiAbility: React.FC<Props> = ({ data }) => {

    return <li key={data.ability.name}>
        <span style={styles.capitalize}>
            {changeDashForSpace(data.ability.name)}
        </span>
        <small style={{ opacity: 0.5 }}><small>
            {data.is_hidden && ' Is Hidden'}
        </small></small>
    </li>
}

export default LiAbility;
