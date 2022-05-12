import React from "react";
import {Search as SearchIcon, Close} from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import {styles} from "./StylesMolecules";

type Props = {
}

const styled = styles.Search;

const Search: React.FC<Props> = ({  }) => {
    const searchTerm = useSelector((s: {searchT: string}) => s.searchT);
    const dispatch = useDispatch();

    const handleSearch = (value : string) => {
        dispatch({ type: "SET", payload: value })
    }
    return (
        <styled.Box component="form">
            <styled.Container>
                <styled.TextField
                    id="outlined-basic"
                    aria-label="Search Pokemon"
                    label="Search"
                    variant="outlined"
                    color="secondary"
                    value={searchTerm}
                    onChange={(event) => handleSearch(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <styled.EndAdorment position="end">
                                {searchTerm
                                    ?
                                    <Close onClick={() => handleSearch('')}/>
                                    :
                                    <SearchIcon/>
                                }
                            </styled.EndAdorment>
                        ),
                    }}
                />

            </styled.Container>

        </styled.Box>
    )
}

export default Search;
