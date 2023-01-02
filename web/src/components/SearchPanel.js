import React, { useContext } from 'react';
import { SearchContext } from '../contexts/Contexts';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchPanel = (searchById, searchByName, setSearch, setSearchById, setSearchByName, getDefault) => {
    const [ searchContext, ] = useContext(SearchContext);

    return (
        <FormControl sx={{ mx: 7, display: 'inline' }}>
            <FormControl sx={{ width: 300, mx: 1 }}>
                <TextField id="txtSearchById" label={`Digite o ${searchContext.id}`} variant="outlined" value={searchById} onChange={e => setSearchById(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchById && setSearch(searchById)} />
                <Button variant='outlined' onClick={() => searchById && setSearch(searchById)}>{`Localizar por ${searchContext.id}`}</Button>
            </FormControl>

            <FormControl sx={{ width: 300, mx: 1 }}>
                <TextField id="txtSearchByName" label={`Digite o ${searchContext.name}`} variant="outlined" value={searchByName} onChange={e => setSearchByName(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchByName && setSearch(searchByName)} />
                <Button variant='outlined' onClick={() => searchByName && setSearch(searchByName)}>{`Locallizar por ${searchContext.name}`}</Button>
            </FormControl>

            <FormControl sx={{ mx: 1 }}>
                <Button variant='contained' onClick={() => getDefault()}>Todos os registros</Button>
            </FormControl>
        </FormControl>
    );
};

export default SearchPanel;
