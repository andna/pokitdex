import {styled} from "@mui/material/styles";
import {AppBar, Container, Grid, Pagination, Typography} from "@mui/material";
import colors from "../atoms/colors";
import {Close} from "@mui/icons-material";


export const styles = {
    PokemonList: {
        Grid: styled(Grid)`
          justify-content: center;
        `,
        Pagination: (isDark: boolean) => styled(Pagination)`
          position: fixed;
          -webkit-box-pack: center;
          justify-content: center;
          height: 33px;
          bottom: 5vh;
          border-radius: 80px;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, .25) ;
          background-color: ${isDark ? '#2b1f2c' : '#ffeaea'};
        `,
    },
    Layout: {
        AppBar: (isDark: boolean) => styled(AppBar)`
          background-color: ${isDark ? colors.redBright : colors.redLight};
          background-image: ${isDark ? 
                  `linear-gradient(45deg, ${colors.redBrightDarkAccent} 50%, ${colors.redBright} 50%);`
                  :
                  `linear-gradient(45deg, ${colors.redLightDarkAccent} 50%, ${colors.redLight} 50%);`
            };
          background-size: 10px 10px;
        `,
        AppBarContent: styled("div")`
          padding: 8px;
          display: flex;
          font-size: 0.8em;
          user-select: none;
          max-width: 1220px;
          width: 100vw;
          margin: 0 auto;
          align-items: center;
          justify-content: space-between;
        `,
        AppBarInner: styled("div")`
          display: flex;
          align-items: center;
        `,
        Close: styled(Close)`
          cursor: pointer;
          padding-right: 2px;
          margin-right: 4px;
        `,
        Logo: styled("img")`
          filter: drop-shadow(0px 3px 2px rgba(0,0,0,.3));
        `,
        WebTitle: styled(Typography)`
          flex-grow: 1;
          font-weight: 700;
          max-width: 42vw;
          text-overflow: ellipsis;
          white-space: pre;
          overflow: hidden;
          text-transform: capitalize;
        `,
        HeaderRightSide: styled("div")`
          display: flex;
          align-items: center;
        `,
        Container: styled(Container)`
          margin-top: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 2400px!important;
        `,
        Fotter: styled("a")`
          text-align: center;
          z-index: -1;
          bottom: 0;
          width: 100%;
          font-size: 0.6em;
          display: block;
          margin-top: 100px;
          color: ${colors.footerColor};
        `,
        Main: styled("main")`
          max-width: inherit;
        `

    }
}

