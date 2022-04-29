import React from "react";
import {Type, VersionGroupDetail} from "../../types/Pokemon";
import {
    Chip
} from "@mui/material";
import colors from "../atoms/colors";
import {changeDashForSpace} from "../../services/pokemonGetter";

const styles = {
    capitalize: {
        textTransform: 'capitalize' as 'capitalize',
    },
    miniInfo: { opacity: 0.5 },
}
type Props = {
    data: VersionGroupDetail;
}

const LiVersionMove: React.FC<Props> = ({ data }) => {

    return <li key={data.version_group.name + data.level_learned_at + data.move_learn_method.name}>
        <small><small>
           <span style={styles.capitalize}>
               Learned In {changeDashForSpace(data.version_group.name)}
           </span>
            <br />
            <span style={styles.miniInfo}>
                by {data.level_learned_at > 0
                ?
                <>reaching level <b>{data.level_learned_at}</b></>
                :
                <b style={styles.capitalize}>
                    {data.move_learn_method.name}
                </b>
                }
            </span>
        </small></small>
    </li>
}

export default LiVersionMove;
