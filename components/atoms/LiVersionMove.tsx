import React from "react";
import {VersionGroupDetail} from "../../types/Pokemon";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {styles} from "./StylesAtoms";

type Props = {
    data: VersionGroupDetail;
}

const styled = styles.LiVersionMove;
const LiVersionMove: React.FC<Props> = ({ data }) => {

    return <li key={data.version_group.name + data.level_learned_at + data.move_learn_method.name}>
        <small><small>
           <styled.LearnedIn>
               Learned In {changeDashForSpace(data.version_group.name)}
           </styled.LearnedIn>
            <br />
            <styled.MiniInfo>
                by {data.level_learned_at > 0
                ?
                <>reaching level <b>{data.level_learned_at}</b></>
                :
                <styled.Name>
                    {data.move_learn_method.name}
                </styled.Name>
                }
            </styled.MiniInfo>
        </small></small>
    </li>
}

export default LiVersionMove;
