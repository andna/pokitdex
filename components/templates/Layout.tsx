import React from "react";

import {Theme} from "@mui/system";
import {AppBar, CssBaseline, Typography, Container} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import colors from "../atoms/colors";

import Head from 'next/head';
import {useRouter} from "next/router";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {Close} from "@mui/icons-material";

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

    logo:{
        filter:'drop-shadow(0px 3px 2px rgba(0,0,0,.3))',
    },
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
    backer: {
        cursor: 'pointer',
        paddingRight: 2,
        marginRight: 4
    }
}

const title : string = 'Pok\'it Dex by abf';

const Layout: React.FC<Props> = ( { children } ) => {

    const router = useRouter()
    const { asPath } = router


    const goBack = () => {
        router.back()
    }
    const isHome = (asPath === '/' || asPath.includes("page") );
    console.log(router.pathname)
    return (<div>

        <Head>
            <title>{title}</title>
            <meta name="description" content="Andres Bastidas F - BlockChain.com Challenge" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main style={{maxWidth: 'inherit'}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar>
                    <div style={styles.appbar}>
                        {isHome
                            ?
                            <></>
                            :
                            <Close style={styles.backer} onClick={() => {
                                router.back()
                            }} />
                        }

                        <img style={styles.logo} src="/pokitdex.svg" alt={title} width={40} height={24}/>
                        <Typography component="div" sx={{ flexGrow: 1, fontWeight: 800 }}>
                            { isHome
                                ?
                                title
                                :
                                <span style={{textTransform: 'capitalize'}}>
                                    {changeDashForSpace(asPath.replace("/",""))}
                                </span>
                                }
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

