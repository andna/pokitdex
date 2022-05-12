import {styled} from "@mui/material/styles";
import {Accordion, AccordionSummary, Box, Chip, InputAdornment, TextField, Typography} from "@mui/material";

// language=CSS prefix=*{ suffix=}
const capitalize = `
    text-transform: capitalize;
`

export const styles = {
    AccordionInfo : {
        Title: styled("span")`${capitalize}`,
        TitleQuant:  styled("small")`opacity: 0.5`,
        Ul: styled("ul")`padding-inline-start: 20px`,
        AccordionRoot : styled(Accordion)({
            margin: "16px 0",
            boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

            "&:before": {
                backgroundColor: "unset",
            },
        }),
        AccordionSummaryContainer : styled(AccordionSummary)({
            padding: "0 24px",
            "& .MuiAccordionSummary-content": {
                margin: "10px 0 !important", // Avoid change of sizing on expanded
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
                color: 'white',
            },
        })
    },
    Naming: {
        NameContainer: styled("div")`
          flex: 1 1 0%;
          padding-left: 8px;
        `,
        Species: styled(Typography)`
          font-weight: 700;
          line-height: 2;
          ${capitalize}
        `,
        FixedSubName: styled(Typography)`
          font-weight: 300;
          line-height: 0.1px;
          position: relative;
          margin: 0px 0px 12.8px;
          display: block;
          top: 0;
          ${capitalize}
        `,
    },
    Search: {
        EndAdorment: styled(InputAdornment)`
          color: inherit;
          cursor: pointer;
        `,
        TextField: styled(TextField)({
            flex: 1,
            marginTop: 0.5,
            marginRight: 2,
            '& .MuiInputBase-root':{
                color: 'white',
            },
            '& .MuiFormLabel-root':{
                color: 'white',
            },
            '& .MuiInputBase-input':{
                height: 15,
            },
            '& .MuiOutlinedInput-notchedOutline':{
                borderColor: 'rgba(255,255,255,.5)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline':{
                borderColor: 'rgba(255,255,255,1)',
            },
            '& .MuiFormLabel-root:not(.Mui-focused):not(.MuiFormLabel-filled)':{
                transform: 'translate(14px, 13px) scale(1)',
            }
        }),
        Box: styled(Box)`
            max-width: 50vw;
        `,
        Container: styled("div")`
          display: flex;
          align-items: center;
          width: 100%;
        `,
    },
    Typing: {

        Chip: (background: string) => styled(Chip)`
          text-transform: uppercase;
          margin-right: 8px;
          font-size: 10px;
          letter-spacing: -0.3px;
          font-weight: 700;
          color: white;
          background: ${background};
        `,
    },
    Avatar: {
        Img: (options:{isBig: boolean, isLoading: boolean, isError: boolean}) => styled("img")`
          height: 96px;
          width: 96px;
          position: relative;
          left: -20px;
          top: -20px;
          filter: drop-shadow(rgba(0, 0, 0, 0.3) 4px 8px 8px);
          transition: all 0.2s ease 0s;
          background: radial-gradient(rgba(200, 200, 200, 0) 1%, transparent 67%);
          overflow: visible;
          ${options.isBig && `
                height: 400px;
                width: 400px;
                max-height: 45vw;
                max-width: 45vw;
            `}
          ${options.isLoading && `
               background: radial-gradient(rgba(200, 200, 200, .2) 1%, transparent 67%)
            `}
          ${options.isError && `
               background: radial-gradient(rgba(200, 200, 200, .2) 1%, transparent 67%)
            `}
        `
    }


}