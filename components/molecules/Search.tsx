import React, {useState} from "react";
import {Box, InputAdornment, TextField, Tooltip, useTheme} from "@mui/material";
import {Search as SearchIcon, Close, Star, StarBorderOutlined} from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';

const styles = {
    endAdorment : {
        color: 'inherit',
        cursor: 'pointer'
    },
    input: {
        flex: 1,
        marginRight: 2,
        '& .MuiInputBase-input':{
            height: 15,
        },
        '& .MuiFormLabel-root:not(.Mui-focused):not(.Mui-filled)':{
           transform: 'translate(14px, 13px) scale(1)'
        }
    },
    box: {
        maxWidth: '50vw',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    favoriter: {
        cursor: 'pointer',
        display: 'none' as 'none'
    }
}

type Props = {
}
const Search: React.FC<Props> = ({  }) => {


    const searchTerm = useSelector((s: {searchT: string}) => s.searchT);
    const dispatch = useDispatch();

    const theme = useTheme();

    const [isFilteredByFavorites, setIsFilteredByFavorites] = useState<boolean>(false);

    const handleSearch = (value : string) => {
        dispatch({ type: "SET", payload: value })
    }



    return (
        <Box
            component="form"
            sx={{
                ...styles.box,
            }}
            noValidate
            autoComplete="off"
        >
            <div style={styles.container}>
                <TextField
                    id="outlined-basic"
                    placeholder="by name"
                    label="Search"
                    variant="outlined"
                    color="secondary"
                    sx={styles.input}
                    value={searchTerm}
                    onChange={(event) => handleSearch(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={styles.endAdorment}>
                                {searchTerm
                                    ?
                                    <Close onClick={() => handleSearch('')}/>
                                    :
                                    <SearchIcon/>
                                }
                            </InputAdornment>
                        ),
                    }}
                />

                <div style={styles.favoriter} onClick={()=>setIsFilteredByFavorites(!isFilteredByFavorites)}>
                    <Tooltip title={`${isFilteredByFavorites ? `Unfilter`: `Filter`} by Favorites`}>
                        { isFilteredByFavorites ?
                            <Star color="secondary"/>
                            :
                            <StarBorderOutlined />
                        }
                    </Tooltip>
                </div>

            </div>

        </Box>
    )
}

export default Search;
