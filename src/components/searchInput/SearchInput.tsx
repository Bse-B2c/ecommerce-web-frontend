import React, {FC} from "react";
import {Search as SearchIcon} from "@mui/icons-material";
import {Autocomplete} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "@components/searchInput/style";

interface SearchInputStateProps{}
interface SearchInputDispatchProps{}

type SearchInputProps = SearchInputStateProps & SearchInputDispatchProps;

const SearchInput: FC<SearchInputProps> = () =>{
    return <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={[]}
        disableClearable
        renderInput={({inputProps:{style,className, ...inputProps},size,...params}) => (
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase size='small' {...params} inputProps={{'aria-label': 'search' ,...inputProps}}/>
            </Search>)}
    />
}

export default SearchInput;
