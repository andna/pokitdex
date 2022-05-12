import {styled} from "@mui/material/styles";
import {Button, Box, Card, CardContent, Typography} from "@mui/material";
import colors from "../atoms/colors";
import {Close, Delete, DeleteOutline} from "@mui/icons-material";

// language=CSS prefix=*{ suffix=}
const capitalize = `
    text-transform: capitalize;
`
// language=CSS prefix=*{ suffix=}
const deleters = `
    margin-right: 16px;
    cursor: pointer;
`

export const styles = {
    DrawerMenu: {
        Box: styled(Box)`
          width: 250px
        `,
        MenuButton: styled(Button)`
          text-transform: none;
          color: white;
          padding: 0px;
          min-width: 30px;
          margin-right: 1vw;
        `
    },
    PageContent: {
        SimpleIcon: styled("span")`
          position: relative;
          top: 6px
        `,
    },
    PokemonCard: {
        Card: (options: {isPage: boolean, isHovered: boolean}) => styled(Card)`
          width: 345px;
          margin-bottom: 16px;
          overflow: unset;
          position: relative;
          ${options.isHovered && !options.isPage &&
            `cursor: pointer !important;
            filter: brightness(1.1)`
          }
          ${options.isPage &&
            `width: 800px;
            max-width: calc(100vw - 42px);
            `
          }
        `,
        GroupName: styled(Typography)`
          opacity: 0.5;
        `,
        ExternalPadding: styled(CardContent)`
          padding: 0.1em !important;
        `,
        InternalPadding: styled("div")`
          padding: 1em;
        `,
        CardContent: styled("div")`
          display: flex;
          align-items: center;
          flex: 1;
          position: relative;
        `,
        deleterContainer: styled("div")`
          opacity: 0.6;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: -10px 0px 15px;
          color: ${colors.redLight};
        `,
        NameContainer: styled("div")`
          flex: 1;
        `,
        Delete: styled(Delete)`${deleters}`,
        Close: styled(Delete)`${deleters}`,
        DeleteOutline: styled(DeleteOutline)`${deleters}`,
        SkeletonContainer: styled("div")` position: relative; `,
        Skeleton: styled("p")`
          position: absolute;
          width: 100%;
          text-align: center;
          z-index: 1;
          text-transform: capitalize;
          bottom: calc(50% - 20px);
          font-weight: 300;
          font-size: 70%;
        `,
    }
}

