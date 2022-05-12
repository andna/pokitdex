import React from "react";
import {Pokemon } from "../../types/Pokemon";
import {Grid} from "@mui/material";
import {Api, BarChart, Egg, Foundation, Height, Scale} from "@mui/icons-material";
import AccordionInfo from "../molecules/AccordionInfo";
import {styles} from "./StylesOrganisms";

type Props = {
    pokemon: Pokemon;
}

const styled = styles.PageContent;

const PageContent: React.FC<Props> = ({ pokemon }) => {

    const simpleData = [
        {icon: <Height color="secondary"/>, name: 'Height', value: (pokemon.height / 10), suffix: 'm'},
        {icon: <Scale color="secondary"/>, name: 'Weight', value: (pokemon.weight / 10), suffix: 'kg'},
        {icon: <Foundation color="secondary"/>, name: 'Base Exp', value: pokemon.base_experience},
    ];
    const statsId = 'stats';

    return <div>
        <Grid container spacing={2} justifyContent="center">
            {simpleData.map(info => <Grid key={info.name} item>
                <styled.SimpleIcon>{info.icon} </styled.SimpleIcon>
                <b>{info.name}: </b>
                {info.value} {info.suffix}
                </Grid>)
            }
        </Grid>
        <AccordionInfo info={pokemon.stats} title={statsId}
                       startsExpanded
                       icon={<BarChart color="secondary"/>}/>
        <AccordionInfo info={pokemon.abilities} title={'abilities'}
                       icon={<Egg  color="secondary"/>}/>
        <AccordionInfo info={pokemon.moves} title={'moves'}
                       icon={<Api  color="secondary"/>}/>
    </div>

}

export default PageContent;
