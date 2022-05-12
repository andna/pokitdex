import {Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    Add,
    CheckBoxOutlineBlank,
    ChevronLeft, ChevronRight,
    DarkMode, Home,
    Menu,
    WbSunny
} from "@mui/icons-material";
import Link from "next/link";
import {Simplex} from "../../types/Simplex";
import {useRouter} from "next/router";
import {styles} from "./StylesOrganisms";

type Props = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isPage: boolean;
    pokeName: string;
}

const styled = styles.DrawerMenu;

const DrawerMenu:React.FC<Props> = ({ isDarkMode, toggleDarkMode, isPage, pokeName }) => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const anchor = 'right'
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };


    const MenuButtons = [
        <Link href={'/'} key="button-home">
            <ListItem button>
                <ListItemIcon>
                    <Home color="secondary"/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItem>
        </Link>,
        <Divider  key="button-divider-1" />,
        <ListItem button onClick={()=> {toggleDarkMode()}} key="button-mode">
            <ListItemIcon color="secondary">
                {isDarkMode ? <DarkMode  color="secondary"/> : <WbSunny  color="secondary"/>}
            </ListItemIcon>
            <ListItemText primary={`Dark Mode ${isDarkMode ? 'Off' : 'On' }`} />
        </ListItem>,
        <Link href={'/add'} key="button-add">
            <ListItem button>
                <ListItemIcon>
                    <Add color="secondary"/>
                </ListItemIcon>
                <ListItemText primary="Add Custom Poke" secondary="BETA"/>
            </ListItem>
        </Link>,

        <Divider  key="button-divider-2" />,
        <ListItem disabled  key="button-teams">
            <ListItemIcon>
                <CheckBoxOutlineBlank   color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Favorites and Team" secondary="Soon"/>
        </ListItem>,
        <ListItem disabled  key="button-types">
            <ListItemIcon>
                <CheckBoxOutlineBlank  color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Type Matchups" secondary="Soon"/>
        </ListItem>,
        <ListItem disabled  key="button-play">
            <ListItemIcon>
                <CheckBoxOutlineBlank  color="secondary"/>
            </ListItemIcon>
            <ListItemText primary="Play Who's that?!" secondary="Soon"/>
        </ListItem>,
    ];

    const list = () => (
        <styled.MenuButton
            role="presentation"
            onKeyDown={toggleDrawer(false)}
            onClick={toggleDrawer(false)}
        >
            <List>
                {MenuButtons.map((button, index) => button)}
            </List>
        </styled.MenuButton>
    );

    const [localList, setLocalList] = useState<Simplex[]>([]);

    useEffect(()=>{
        const getlocalList = localStorage.getItem('pokemon-list');
        if(getlocalList){
            setLocalList(JSON.parse(getlocalList));
        }
    }, [])

    const router = useRouter()
    function navigateToOtherPage(toPrevious: boolean = false){
        let index = localList.indexOf(localList.find(poke => poke.name === pokeName) as Simplex);
        index += toPrevious ? -1 : 1;
        if(index < 0){
            index = localList.length - 1;
        }
        if(index >= localList.length){
            index = 0;
        }
        router.push('/' + localList[index].name);
    }

    return (
        <div>
            <>
                {isPage && localList && localList.length > 0 && <>
                    <styled.MenuButton
                            onClick={()=> navigateToOtherPage( true)}>
                        <ChevronLeft />
                    </styled.MenuButton>
                    <styled.MenuButton
                            onClick={()=> navigateToOtherPage()}>
                        <ChevronRight />
                    </styled.MenuButton>
                    </>}
                <styled.MenuButton >
                    <Menu onClick={toggleDrawer( true)}/>
                </styled.MenuButton>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer( false)}
                >
                    {list()}
                </Drawer>
            </>
        </div>
    );
}

export default DrawerMenu;
