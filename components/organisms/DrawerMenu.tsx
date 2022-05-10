import {Box, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import {Add, DarkMode, Menu, WbSunny} from "@mui/icons-material";
import Link from "next/link";

type Props = {
    isDarkMode: boolean;
    toggleDarkMode: () => void
}


const DrawerMenu:React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => {

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
        <ListItem button onClick={()=> {toggleDarkMode()}}>
            <ListItemIcon color="secondary">
                {isDarkMode ? <DarkMode /> : <WbSunny />}
            </ListItemIcon>
            <ListItemText primary={`Dark Mode ${isDarkMode ? 'Off' : 'On' }`} />
        </ListItem>,
        <Link href={'/add'}>
            <ListItem button>
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <ListItemText primary="Add Custom Poke" secondary="BETA"/>
            </ListItem>
        </Link>,
    ];

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
            onClick={toggleDrawer(false)}
        >
            <List>
                {MenuButtons.map((button, index) => (
                   <React.Fragment key={index}>
                       {button}
                   </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <>
                <Button sx={{color: 'white', margin: '0 -10px 0 -20px'}} onClick={toggleDrawer( true)}>
                    <Menu />
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
