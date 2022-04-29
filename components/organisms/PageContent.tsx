import React from "react";
import {Pokemon } from "../../types/Pokemon";
import {Grid} from "@mui/material";
import {Api, BarChart, Egg, Foundation, Height, Scale} from "@mui/icons-material";
import AccordionInfo from "../molecules/AccordionInfo";

const styles = {
    chip: {
        textTransform: 'uppercase',
        marginRight: 1,
        fontSize: 10,
        fontFamily: 'system-ui',
        letterSpacing: '-0.3px',
        fontWeight: 800
    }
}
type Props = {
    pokemon: Pokemon;
}

const PageContent: React.FC<Props> = ({ pokemon }) => {

    const simpleData = [
        {icon: <Height/>, name: 'Height', value: (pokemon.height / 10), suffix: 'm'},
        {icon: <Scale/>, name: 'Weight', value: (pokemon.weight / 10), suffix: 'kg'},
        {icon: <Foundation/>, name: 'Base Exp', value: pokemon.base_experience},
    ];

    return <div>
        <Grid container spacing={2} justifyContent="center">
            {simpleData.map(info => <Grid key={info.name} item>
                {info.icon} <b>{info.name}: </b> {info.value} {info.suffix}
                </Grid>)
            }
        </Grid>
        <AccordionInfo info={pokemon.stats} title={'stats'} icon={<BarChart/>}/>
        <AccordionInfo info={pokemon.abilities} title={'abilities'} icon={<Egg/>}/>
        <AccordionInfo info={pokemon.moves} title={'moves'} icon={<Api />}/>
    </div>

}

export default PageContent;
