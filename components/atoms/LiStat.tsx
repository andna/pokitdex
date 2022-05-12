import React from "react";
import {Stat} from "../../types/Pokemon";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {Bolt, Favorite, PanToolOutlined, ShieldMoon, ShieldOutlined, Speed} from "@mui/icons-material";
import colors from "../atoms/colors";

import {styles} from "./StylesAtoms";

type Props = {
    data: Stat;
}

const icolors : any = colors.icons;

const icons : any = {
    hp: {color: icolors.hp, icon: <Favorite/>},
    attack: {color: icolors.attack, icon: <PanToolOutlined />},
    defense: {color: icolors.defense, icon: <ShieldOutlined />},
    ['special-attack']: {color: icolors.specialAttack, icon: <Bolt />},
    ['special-defense']: {color: icolors.specialDefense, icon: <ShieldMoon />},
    speed: {color: icolors.speed, icon: <Speed />}
};

const styled = styles.LiStat;

const LiStat: React.FC<Props> = ({ data }) => {

    const StyledStatIcon = styled.StatIcon(icons[data.stat.name].color)
    const StyledEffort = styled.Effort(data.effort > 0)

    return<styled.List key={data.stat.name}>
        <StyledStatIcon>
            {icons[data.stat.name].icon}
        </StyledStatIcon>
        <styled.BaseStat>{data.base_stat} </styled.BaseStat>
        <styled.StatName>
            {changeDashForSpace(data.stat.name)}
        </styled.StatName>
        <StyledEffort>
            <small>
                {` Effort: ${data.effort}`}
            </small>
        </StyledEffort>
    </styled.List>
}

export default LiStat;
