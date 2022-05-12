import {styled} from "@mui/material/styles";
import {Button, Box, Card} from "@mui/material";

// language=CSS prefix=*{ suffix=}
const capitalize = `
    text-transform: capitalize;
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
    }
}

