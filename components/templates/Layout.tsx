import React from "react";

import {Theme} from "@mui/system";
import {AppBar, CssBaseline, Typography, Container} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import colors from "../atoms/colors";

import Image from "next/image";
import Head from 'next/head';

type Props = {
    children?: React.ReactNode;
}


const theme : Theme = createTheme({
    palette: {
        //type: 'dark',
        primary: {
            main: colors.redBright,
        },
        secondary: {
            main: colors.secondary,
        },
        background: {
            default: colors.redDark,
            paper: colors.redPale,
        },
        text: {
            primary: colors.white,
            secondary: colors.white,
        },
    },
});


const styles = {

    appbar: {
        padding: '8px',
        display: 'flex',
        fontSize: '0.8em',
        userSelect: 'none' as 'none',
    },
    content: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '2400px !important'
    },
    footer: {
        textAlign: 'center' as 'center',
        zIndex: -1,
        bottom: 0,
        width: '100%',
        fontSize: '0.6em',
        display: 'block',
        marginTop: 100,
        color: colors.footerColor,
    },
}

const title : string = 'pokitdex by abf';

const Layout: React.FC<Props> = ( { children } ) => {

    return (<div>

        <Head>
            <title>{title}</title>
            <meta name="description" content="Andres Bastidas F - Media Monks Challenge" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{maxWidth: 'inherit'}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar>
                    <div style={styles.appbar}>
                        <Image src="/vercel.svg" alt={title} width={40} height={16}/>
                        <Typography component="div" sx={{ flexGrow: 1, fontWeight: 800 }}>
                            { title }
                        </Typography>

                    </div>
                </AppBar>
                <Container component="main" sx={styles.content}>
                    {children}
                </Container>
            </ThemeProvider>
        </main>

        <footer>
            <a
                href="https://github.com/andna/pokitdex"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.footer}
            >
                By Andres Bastidas Fierro @ 2022
            </a>
        </footer>
    </div>)
}

export default Layout;

