import React from "react";
import {AbilityObject, Move, Stat, VersionGroupDetail} from "../../types/Pokemon";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {styled} from "@mui/material/styles";
import {
    Bolt,
    ExpandMore,
    Favorite,
    PanTool,
    PanToolOutlined,
    Shield,
    ShieldMoon,
    ShieldOutlined,
    Speed
} from "@mui/icons-material";
import {changeDashForSpace} from "../../services/pokemonGetter";

const styles = {
    capitalize: {
        textTransform: 'capitalize' as 'capitalize',
    },
    statIcon: {
        margin: '0 6px 0 3px',
        position: 'relative' as 'relative',
        top: 6

    },
    miniInfo: { opacity: 0.5 },
    ul: {
        paddingInlineStart: 20,
    }
}

const AccordionRoot = styled(Accordion)({
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

    "&:before": {
        backgroundColor: "unset",
    },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
    padding: "0 24px",
    "& .MuiAccordionSummary-content": {
        margin: "10px 0 !important", // Avoid change of sizing on expanded
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
        color: 'white',
    },
});

type Props = {
    icon?: React.ReactNode;
    info: Stat[] | AbilityObject[] | Move[] | VersionGroupDetail[];
    title: string;
}

const AccordionInfo: React.FC<Props> = ({ icon = null, info, title }) => {

    return  <AccordionRoot
        elevation={3}
        disabled={info.length === 0}
    >
        <AccordionSummaryContainer expandIcon={<ExpandMore />}>
            {icon}
            <span style={styles.capitalize}>
                {title}
                {title !== 'stats' &&
                <small style={styles.miniInfo}> ({info.length}{
                    title !== 'moves' &&
                        title !== 'stats' &&
                        title !== 'abilities' &&
                    ' methods'
                })</small>}
            </span>
        </AccordionSummaryContainer>
        <AccordionDetails>
            <ul style={styles.ul}>
                {info.map(data => {
                    switch(title){
                        case 'stats':
                            const icons : any = {
                                hp: <Favorite/>,
                                attack: <PanToolOutlined />,
                                defense: <ShieldOutlined />,
                                ['special-attack']: <Bolt />,
                                ['special-defense']: <ShieldMoon />,
                                speed: <Speed />
                            };
                            const statData = data as Stat;
                            return  <li key={statData.stat.name}>
                                <b>{statData.base_stat} </b>
                                <span style={styles.statIcon}>
                                    {icons[statData.stat.name]}
                                </span>
                                <span style={styles.capitalize}>
                                    {changeDashForSpace(statData.stat.name)}
                                </span>
                                <small style={
                                    statData.effort > 0 ? { opacity: 0.6 } : { opacity: 0.1 }
                                }><small>
                                    {` Effort: ${statData.effort}`}
                                </small></small>
                            </li>
                            break;
                        case 'abilities':
                            const abilityData = data as AbilityObject;
                            return  <li key={abilityData.ability.name}>

                                <span style={styles.capitalize}>
                                    {changeDashForSpace(abilityData.ability.name)}
                                </span>
                                <small style={styles.miniInfo}><small>
                                   {abilityData.is_hidden && ' Is Hidden'}
                                </small></small>
                            </li>
                            break;
                        case 'moves':
                            const moveData = data as Move;
                            return <li key={moveData.move.name}>
                                <AccordionInfo info={moveData.version_group_details}
                                               title={moveData.move.name}/>
                            </li>
                            break;
                        default:
                            const versionMove = data as VersionGroupDetail;
                            return <li key={versionMove.version_group.name + versionMove.level_learned_at + versionMove.move_learn_method.name}>
                                <small><small>
                                   <span style={styles.capitalize}>
                                       Learned In {changeDashForSpace(versionMove.version_group.name)}
                                   </span>
                                    <br />
                                    <span style={styles.miniInfo}>
                                        by {versionMove.level_learned_at > 0
                                            ?
                                        <>reaching level <b>{versionMove.level_learned_at}</b></>
                                            :
                                            <b style={styles.capitalize}>
                                                {versionMove.move_learn_method.name}
                                            </b>
                                        }
                                    </span>
                                </small></small>
                            </li>
                            break;
                    }


                })}
            </ul>
        </AccordionDetails>
    </AccordionRoot>
}

export default AccordionInfo;
