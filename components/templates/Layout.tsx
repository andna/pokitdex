import React, {useEffect, useState} from "react";

import {Theme} from "@mui/system";
import {AppBar, CssBaseline, Typography, Container} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import colors from "../atoms/colors";

import Link from 'next/link'
import Head from 'next/head';
import {useRouter} from "next/router";
import {changeDashForSpace} from "../../services/pokemonGetter";
import {Add, Close} from "@mui/icons-material";
import Search from "../molecules/Search";
import DrawerMenu from "../organisms/DrawerMenu";

type Props = {
    children?: React.ReactNode;
}


const themeDark : Theme = createTheme({
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
    typography: {
        fontFamily: 'Jost, sans-serif'
    }
});
const themeLight : Theme = createTheme({
    palette: {
        primary: {
            main: colors.redLight,
        },
        secondary: {
            main: colors.secondary,
        },
        background: {
            default: colors.lightGray,
        },
        text: {
            primary: colors.textLight,
        },
    },
    typography: {
        fontFamily: 'Jost, sans-serif'
    }
});


const styles = {

    logo:{
        filter:'drop-shadow(0px 3px 2px rgba(0,0,0,.3))',
    },
    appBarBackDark:{
        backgroundColor: colors.redBright,
        backgroundImage: `linear-gradient(45deg, ${colors.redBrightDarkAccent} 50%, ${colors.redBright} 50%);`,
        backgroundSize: '10px 10px'
    },
    appBarBackLight:{
        backgroundColor: colors.redLight,
        backgroundImage: `linear-gradient(45deg, ${colors.redLightDarkAccent} 50%, ${colors.redLight} 50%);`,
        backgroundSize: '10px 10px'
    },
    flex:{
        display: 'flex',
        alignItems: 'center' as 'center',
    },
    appbar: {
        padding: '8px',
        display: 'flex',
        fontSize: '0.8em',
        userSelect: 'none' as 'none',
        maxWidth: 1220,
        width: '100vw',
        margin: '0 auto',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between'
    },
    content: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '2400px !important',
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
    },
    adder: {
        cursor: 'pointer',
        paddingRight: 2,
        marginRight: 60,
        display: 'flex',
        alignItems: 'center',
        opacity: 0.8,
        "&:hover": {
            opacity: 0.2
        }
    },
    webTitle:{
        flexGrow: 1,
        fontWeight: 700,
        maxWidth: '48vw',
        textOverflow: 'ellipsis',
        whiteSpace: 'pre',
        overflow: 'hidden'
    }
}

const title : string = 'Pok\'it Dex';

const Layout: React.FC<Props> = ( { children } ) => {

    const router = useRouter()
    const { asPath } = router

    const isHome = (asPath === '/' || asPath.includes("page") );
    const otherTitle = changeDashForSpace(asPath.replace("/",""));

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

    const toggleDarkTheme = () => {
        localStorage.setItem('isDarkTheme', isDarkTheme ? 'false' : 'true')
        setIsDarkTheme(!isDarkTheme);
    }

    useEffect(() => {
        const localIsDark = localStorage.getItem('isDarkTheme');
        if(localIsDark){
            setIsDarkTheme(localIsDark === 'true');
        }
    }, [])

    return (<div>

        <Head>
            <title>{isHome ? null : `${otherTitle.toUpperCase()} |`} {title}</title>
            <meta name="description" content="Andres Bastidas F - BlockChain.com Challenge" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;700&display=swap"
                          rel="stylesheet" />
        </Head>

        <main style={{maxWidth: 'inherit'}}>
            <ThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
                <CssBaseline />
                <AppBar sx={ isDarkTheme ? styles.appBarBackDark : styles.appBarBackLight}>
                    <div style={styles.appbar}>
                        <div style={styles.flex}>
                            {isHome
                                ?
                                <></>
                                :
                                <Close style={styles.backer} onClick={() => {
                                    router.back()
                                }} />
                            }

                            <img style={styles.logo} src="/pokitdex.svg" alt={title} width={40} height={24}/>
                            <Typography component="div" sx={styles.webTitle}>
                                { isHome
                                    ?
                                    title
                                    :
                                    <span style={{textTransform: 'capitalize'}}>
                                    {otherTitle}
                                </span>
                                }
                            </Typography>
                        </div>

                        <div style={styles.flex}>
                            {isHome && <Search  />}
                            <DrawerMenu isDarkMode={isDarkTheme}
                                        isPage={!isHome}
                                        pokeName={asPath.replace("/","")}
                                        toggleDarkMode={toggleDarkTheme} />
                        </div>

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

