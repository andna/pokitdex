import React, {useEffect, useState} from "react";

import {Theme} from "@mui/system";
import {CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import colors from "../atoms/colors";

import Head from 'next/head';
import {useRouter} from "next/router";
import {changeDashForSpace} from "../../services/pokemonGetter";

import Search from "../molecules/Search";
import DrawerMenu from "../organisms/DrawerMenu";
import {styles} from "./StylesTemplates";

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



const title : string = 'Pok\'it Dex';

const styled = styles.Layout;

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

    const StyledAppBar = styled.AppBar(isDarkTheme);

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

        <styled.Main>
            <ThemeProvider theme={isDarkTheme ? themeDark : themeLight}>
                <CssBaseline />
                <StyledAppBar>
                    <styled.AppBarContent>
                        <styled.AppBarInner>
                            {isHome
                                ?
                                <></>
                                :
                                <styled.Close onClick={() => {
                                    router.back()
                                }} />
                            }

                            <styled.Logo src="/pokitdex.svg" alt={title} width={40} height={24}/>
                            <styled.WebTitle>
                                { isHome
                                    ?
                                    title
                                    :
                                    <>{otherTitle}</>
                                }
                            </styled.WebTitle>
                        </styled.AppBarInner>

                        <styled.HeaderRightSide>
                            {isHome && <Search  />}
                            <DrawerMenu isDarkMode={isDarkTheme}
                                        isPage={!isHome}
                                        pokeName={asPath.replace("/","")}
                                        toggleDarkMode={toggleDarkTheme} />
                        </styled.HeaderRightSide>

                    </styled.AppBarContent>
                </StyledAppBar>
                <styled.Container>
                    {children}
                </styled.Container>
            </ThemeProvider>
        </styled.Main>

        <footer>
            <styled.Fotter
                href="https://github.com/andna/pokitdex"
                target="_blank"
                rel="noopener noreferrer"
            >
                By Andres Bastidas Fierro @ 2022
            </styled.Fotter>
        </footer>
    </div>)
}

export default Layout;

