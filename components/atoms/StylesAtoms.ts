import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

// language=CSS prefix=*{ suffix=}
const capitalize = `
    text-transform: capitalize;
`
// language=CSS prefix=*{ suffix=}
const isPageIndexNumber = `
    top: 4.2vw;
    left: initial;
    bottom: initial;
`


export const styles = {
    GenTitle: {
        Title: styled(Typography)`
          font-size: 1.25rem;
          color: #aa5b5b;
          width: 100%;
          background: linear-gradient(180deg, rgba(188, 81, 103, .3) 1%, transparent 80%);
          border-radius: 20px 20px 0 0;
          text-align: center;
          padding: 16px;
          font-weight: 700;
          margin: 40px 8px 15px 24px;
        `
    },
    PokeIndex: {
        IndexNumber: (isPage : boolean) => styled(Typography)`
          font-weight: 300;
          line-height: 0.1;
          letter-spacing: 0.3em;
          position: absolute;
          opacity: 0.5;
          padding: 8px;
          left: 2px;
          bottom: 8px;
          ${isPage && isPageIndexNumber};
        `,
        Identifier: styled("span")`
          letter-spacing: 0;    
        `,
    },
    LiAbility: {
        Ability: styled("span")`${capitalize}`
    },
    LiStat: {
        StatName: styled("span")`${capitalize}`,
        BaseStat: styled("b")`
          width: 42px;
          display: inline-block;
        `,
        List: styled("li")`
          display: block;
        `,
        StatIcon: (color:string) => styled("span")`
          margin: 0 10px 0 -12px;
          position: relative;
          top: 6px;
          color: ${color}
        `,
        Effort: (htZero : boolean) =>  styled("small")`
          opacity: ${htZero ? 0.6 : 0.1}
        `,
    },
    LiVersionMove: {
        LearnedIn: styled("span")`
          ${capitalize}
        `,
        Name: styled("b")`
          ${capitalize}
        `,
        MiniInfo: styled("span")`
          opacity: 0.5;
        `
    }
}