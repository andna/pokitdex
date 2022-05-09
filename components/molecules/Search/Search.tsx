import React, {useEffect, useState} from "react";
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
        marginRight: 2
    },
    box: {
        position: 'fixed',
        borderRadius: 3,
        padding: 1.6,
        zIndex: 2,
        top: 35,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        width: 350,
        paddingRight: 12
    },
    favoriter: {
        cursor: 'pointer',
        display: 'none' as 'none'
    }
}

type Props = {
}
const Search: React.FC<Props> = ({  }) => {


    const searchTerm = useSelector((s) => s.searchT);
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
                background: theme.palette.background.default
            }}
            noValidate
            autoComplete="off"
        >
            <div style={styles.container}>
                <TextField
                    id="outlined-basic"
                    placeholder="by name, comics, stories, series"
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
