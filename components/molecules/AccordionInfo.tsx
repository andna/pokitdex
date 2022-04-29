import React from "react";
import {AbilityObject, Move, Stat, VersionGroupDetail} from "../../types/Pokemon";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ExpandMore} from "@mui/icons-material";

import LiStat from "../atoms/LiStat";
import LiAbility from "../atoms/LiAbility";
import LiVersionMove from "../atoms/LiVersionMove";
import {changeDashForSpace} from "../../services/pokemonGetter";

const styles = {
    capitalize: {
        textTransform: 'capitalize' as 'capitalize',
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
    startsExpanded?: boolean;
}

const AccordionInfo: React.FC<Props> = ({ startsExpanded = false,
                                            icon = null,
                                            info,
                                            title }) => {

    const [expanded, setExpanded] = React.useState<string | false>(startsExpanded ? title : false );

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return  <AccordionRoot
        elevation={3}
        disabled={info.length === 0}
        expanded={expanded === title}
        onChange={handleChange(title)}
    >
        <AccordionSummaryContainer expandIcon={<ExpandMore />}>
            {icon}
            <span style={styles.capitalize}>
                {changeDashForSpace(title)}
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
                {info.map((data, i) => {
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
            </ul>
        </AccordionDetails>
    </AccordionRoot>
}

export default AccordionInfo;
