import {Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    Add,
    AutoAwesome,
    CheckBoxOutlineBlank,
    ChevronLeft, ChevronRight,
    DarkMode,
    Menu,
    QuestionAnswer,
    WbSunny
} from "@mui/icons-material";
import Link from "next/link";
import {Simplex} from "../../types/Simplex";
import {useRouter} from "next/router";

type Props = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isPage: boolean;
    pokeName: string;
}

const styles = {
    menuButton:{
        color: 'white',
        padding: 0,
        minWidth: 30,
        marginRight: '1vw'
    }
}

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

        <Divider  key="button-divider" />,
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
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
            onClick={toggleDrawer(false)}
        >
            <List>
                {MenuButtons.map((button, index) => button)}
            </List>
        </Box>
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
                    <Button sx={styles.menuButton}
                            onClick={()=> navigateToOtherPage( true)}>
                        <ChevronLeft />
                    </Button>
                    <Button sx={styles.menuButton}
                            onClick={()=> navigateToOtherPage()}>
                        <ChevronRight />
                    </Button>
                    </>}
                <Button sx={styles.menuButton}>
                    <Menu onClick={toggleDrawer( true)}/>
                </Button>
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
