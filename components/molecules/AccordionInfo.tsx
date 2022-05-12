import React from "react";
import {AbilityObject, Move, Stat, VersionGroupDetail} from "../../types/Pokemon";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

import LiStat from "../atoms/LiStat";
import LiAbility from "../atoms/LiAbility";
import LiVersionMove from "../atoms/LiVersionMove";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {styles} from "./StylesMolecules";

type Props = {
    icon?: React.ReactNode;
    info: Stat[] | AbilityObject[] | Move[] | VersionGroupDetail[];
    title: string;
    startsExpanded?: boolean;
}

const styled = styles.AccordionInfo;

const AccordionInfo: React.FC<Props> = ({ startsExpanded = false,
                                            icon = null,
                                            info,
                                            title }) => {

    const [expanded, setExpanded] = React.useState<string | false>(startsExpanded ? title : false );

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return  <styled.AccordionRoot
        elevation={3}
        disabled={info && info.length === 0}
        expanded={expanded === title}
        onChange={handleChange(title)}
    >
        <styled.AccordionSummaryContainer expandIcon={<ExpandMore />}>
            {icon}
            <styled.Title>
                {changeDashForSpace(title)}
                {title !== 'stats' &&
                <styled.TitleQuant> ({info && info.length}{
                    title !== 'moves' &&
                        title !== 'stats' &&
                        title !== 'abilities' &&
                    ' methods'
                })</styled.TitleQuant>}
            </styled.Title>
        </styled.AccordionSummaryContainer>
        <AccordionDetails>
            <styled.Ul>
                {info && info.map((data, i) => {
                    switch(title){
                        case 'stats':
                            return  <LiStat data={data as Stat} key={`${title}-${i}`}/>
                            break;
                        case 'abilities':
                            return  <LiAbility data={data as AbilityObject}  key={`${title}-${i}`}/>
                            break;
                        case 'moves':
                            const moveData = data as Move;
                            return <li key={`${title}-${i}`}>
                                        <AccordionInfo info={moveData.version_group_details}
                                                        title={moveData.move.name}/>
                                    </li>
                            break;
                        default:
                            return <LiVersionMove data={data as VersionGroupDetail}  key={`${title}-${i}`}/>;
                            break;
                    }


                })}
            </styled.Ul>
        </AccordionDetails>
    </styled.AccordionRoot>
}

export default AccordionInfo;
