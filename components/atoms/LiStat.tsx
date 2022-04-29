import React from "react";
import {Stat} from "../../types/Pokemon";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {Bolt, Favorite, PanToolOutlined, ShieldMoon, ShieldOutlined, Speed} from "@mui/icons-material";
import colors from "../atoms/colors";

const styles = {
    b:{
        width: 42,
        display: 'inline-block'
    },
    li:{
        display: 'block'
    },
    capitalize: {
        textTransform: 'capitalize' as 'capitalize',
    },
    statIcon: {
        margin: '0 10px 0 -12px',
        position: 'relative' as 'relative',
        top: 6,

    },
}
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

const LiStat: React.FC<Props> = ({ data }) => {

    return<li key={data.stat.name} style={styles.li}>
        <span style={{...styles.statIcon,
            ...{color: icons[data.stat.name].color}}}>
            {icons[data.stat.name].icon}
        </span>
        <b style={styles.b}>{data.base_stat} </b>
        <span style={styles.capitalize}>
            {changeDashForSpace(data.stat.name)}
        </span>
        <small style={
            data.effort > 0 ? { opacity: 0.6 } : { opacity: 0.1 }
        }><small>
            {` Effort: ${data.effort}`}
        </small></small>
    </li>
}

export default LiStat;
